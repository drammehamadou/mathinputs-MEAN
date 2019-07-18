import { Injectable } from '@angular/core';
import * as MathJS from 'mathjs';
import { Observable, Subject } from 'rxjs';

declare module 'mathjs' {

  interface MathJsStatic {
    import(object: object | Array<object>, options: MathJS.ImportOptions);
    [key: string]: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SolverService {
  private _variables: Array<string>;
  private _equations: Array<string>;
  private _graph: object;

  /**
   * This is a bus for pushing and obtaining changes
   */
  private updates: Subject<any> = new Subject<any>();

  constructor() {
    this._variables = [];
    this._equations = [];
    this._graph = {};
    // Extend MathJS functions, can we put these elsewhere??
    // Also need cumsum, cumprod
    const ndims = function(v) {
        if (MathJS.typeof(v) === 'Matrix') {
            const dims = MathJS.size(MathJS.size(v));
            return MathJS.subset(dims, MathJS.index(0));
        }
        return 0;
    };
    const get = function(v, name) {
        if (!name) {
            return v;
        }
        if (!Array.isArray(name)) {
            // Split a string name to handle dot-notation
            return get(v, name.split('.'));
        }
        if (name.length === 0) {
            return v;
        }
        switch (MathJS.typeof(v)) {
            case 'Object':
                // Get the field and then get any subfields of that
                const value = MathJS.subset(v, MathJS.index(name[0]));

                if (typeof value === 'number' || Array.isArray(value)) { return value; }
                return get(value, v.slice(1));
            case 'Matrix':
            case 'Array':
                // We are assuming this is an array of objects
                return v.map(function(el) { return get(el, name); });
            default:
               // Should be an error but just return the value
               return v;
        }
    };
    // Import the new functions: http://mathjs.org/docs/reference/functions/import.html
    try {
      MathJS.import({ndims, get}, {});
    } catch (e) {
      // ignore
    }
  }

  /**
   * @param prefix
   * @param expression
   * @return expression label
   */
  registerExpression(prefix: string, expression: string): string {
    expression = expression.replace(/\./g, '_');
    return this.addExpressionToGraph(this.demote(prefix, expression));
//      console.log(this._graph);
//      var graph = {
//          v1: ['v2', 'v5'],
//          v2: [],
//          v3: ['v1', 'v2', 'v4', 'v5'],
//          v4: [],
//          v5: []
//      };
//      var vertices = topologicalSort(this._graph); // ['v3', 'v4', 'v1', 'v5', 'v2']
//      console.log(vertices);
//      var blocks = tarjanConnectedComponents(this._graph);
//      console.log(blocks);
//      var calcfc = function(n, m, ix, ocon) {
//          console.log("calling calcfc");
//          return 0;
//      }
//      var iterationCallback = function() {
//
//      }
//      var callbackIterations = function() {
//
//      }
//      console.log(FindMinimum);
//      FindMinimum(calcfc, 1,  0, [0], 10, 0.1,  3,  100, 20, iterationCallback, callbackIterations)

  }

  /**
   * Converts "a = b + c" with prefix "x" to "x.a = x.b + x.c"
   */
  demote(prefix: string, expression: string) {
    if (prefix == '') {
      return expression;
    }
    const node = MathJS.parse(expression);
    return node.transform(function (node, path, parent) {
      if ('SymbolNode' == node.type) {
        // Following syntax is required to avoid a TS compile error
        return new MathJS['expression']['node']['SymbolNode'](prefix + '_' + node.name);
      } else {
        return node;
      }
    }).toString();
  }

  /**
   * Build a directed graph between variables and equations. Uses labels for objects.
   */
  addExpressionToGraph(expression: string) {
    if (this._equations.indexOf(expression) < 0) {
      this._equations.push(expression);
    }
    const label = this.getEquationLabel(expression);
    if (!this._graph[label]) {
      this._graph[label] = [];
    }
    // Parse an expression
    const node = MathJS.parse(expression);
    node.traverse((node, path, parent) => {
      if ('SymbolNode' == node.type) {
        const vlabel = this.registerVariable(node.name);
        if ('AssignmentNode' == parent.type) {
          if ('object' == path) {
            // Output variable
            if (this._graph[label]) {
              if (this._graph[label].indexOf(vlabel) == -1) {
                this._graph[label].push(vlabel);
              }
            } else {
              this._graph[label] = [vlabel];
            }
          } else {
            // Input variable
            if (this._graph[vlabel]) {
              if (this._graph[vlabel].indexOf(label) == -1) {
                this._graph[vlabel].push(label);
              }
            } else {
              this._graph[vlabel] = [label];
            }
          }
        } else {
          // Input variable
          if (this._graph[vlabel]) {
            if (this._graph[vlabel].indexOf(label) == -1) {
              this._graph[vlabel].push(label);
            }
          } else {
            this._graph[vlabel] = [label];
          }
        }
      }
    });
    return label;
  }

  public registerVariable(variable: string): string {
    if (this._variables.indexOf(variable) < 0) {
      this._variables.push(variable);
    }

    return this.getVariableLabel(variable);
  }

  getVariable(label: string) {
    return this._variables[parseInt(label.substring(1)) - 1];
  }

  getEquation(label: string) {
    return this._equations[parseInt(label.substring(1)) - 1];
  }

  updateEquation(label: string, expression: string) {
    this._equations[parseInt(label.substring(1)) - 1] = expression;
  }

  getVariableLabel(variable: string) {
    return 'v' + this._variables.indexOf(variable) + 1;
  }

  getEquationLabel(expression: string) {
    return 'e' + this._equations.indexOf(expression) + 1;
  }

  /**
   * Evaluates the expressions in the given scope
   */
  evaluate(scope: object) {
    // just simple naive implementation for a concrete case
    const equation = this._equations[0];

    scope = this.rebuildScope(scope);

    try {
      const code = MathJS.compile(equation);
      const result = code.eval(scope);

      this.updates.next(result); // there should be some sort of a reference to the expression, values

    } catch (e) {
      console.error(scope, equation);
      console.error(e);
    }

    // after evaluation, when we know what has been changed we may push the information
    // i.e.: this.updates.next({"v01": 20});
    // observing components should then check whether this update contains any of the component variables
  }

  getUpdates(): Observable<any> {
    return this.updates;
  }

  private rebuildScope(scope: object) {
    let newScope = {};

    for (const [key, value] of Object.entries(scope)) {
      const tmpScope = {};
      const keys = key.split('.');

      if (keys.length > 1) {
        let tmp = tmpScope[keys[0]] = {};
        for (let i = 1; i < keys.length - 1; ++i) {
          tmp = tmp[keys[i]] = {};
        }

        if (value.constructor == Object) {
          tmp[keys[keys.length - 1]] = this.rebuildScope(value);
        } else {
          tmp[keys[keys.length - 1]] = value;
        }
      } else {
        tmpScope[key] = value;
      }

      newScope = this.deepMergeObjects(newScope, tmpScope);
    }

    return newScope;
  }

  private deepMergeObjects(o1: object, o2: object) {
    for (const p in o2) {
      try {
        if (o2.hasOwnProperty(p) && o2[p].constructor == Object) {
          o1[p] = this.deepMergeObjects(o1[p], o2[p]);
        } else {
          o1[p] = o2[p];
        }
      } catch (e) {
        if (o2.hasOwnProperty(p)) {
          o1[p] = o2[p];
        }
      }
    }

    return o1;
  }

}

class InverseExpression {

  constructor(private expression: string) {}

  evaluate(scope: object) {

  }

}

