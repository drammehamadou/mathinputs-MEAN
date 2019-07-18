# CAE Tech Math inputs

## Content

1. [Run project](#run-project)
2. [Build](#build)
3. [Components](#components)
4. [Other Components](#other-components)
5. [Services](#services)
6. [Other Classes](#other-classes)
7. [This and that](#this-and-that)

## Run project

1. Clone this repository
2. Enter root of the project (location of `package.json`)
3. Execute `npm install` to download all required dependencies
4. Run `ng serve` to start a dev server. App should be up and running at `http://localhost:4202/` 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Components

* [Numeric Input](#numeric-input) 
* [Matrix/Array Input](#matrixarray-input) 
* [Expression Input](#expression-input) 
* [Chart](#chart) 
* [Knob](#knob) 
* [Expression Printer](#expression-printer)
* [Contour Plot](#contour-plot) 
* [Checkbox](#checkbox)
* [Paragraph](#paragraph)
* [Paragraph Group](#paragraph-group)
* [SVG](#svg)
* [Data table](#data-table)
* [Heatmap table](#heatmap-table)
* [Switch](#switch)
* [Dropdown](#dropdown)

> In Angular 2+ when component has properties of type `prop` and `propChange` it can be used either as: 
`<component ... [prop]="myProp" (propChanges)="myProp=$event" ...></component>` or:
`<component ... [(prop)]="myProp" ...></component>` to achieve same effect (two way binding).

### Numeric Input

Allows to input numeric data and switch units. Recalculates units on unit change.  
  
````
<cae-numeric-input
      [name]="string"
      [(variable)]="number"
      [(unit)]="string"
      [units]="[string]"
      [readOnly]="boolean"></cae-numeric-input>
````
  
| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *name* | input | **string** | Variable name, used in expressions |
| *variable* | input | **number** | Default variable |
| *variableChange* | output | **EventEmitter\<number\>** | Allows to get updates on inner variable change via `$event` variable |
| *unit* | input | **string** | Default unit for variable |
| *unitChange* | output | **EventEmitter\<string\>** | Allows to get updates on inner unit change via `$event` variable |
| *units* | input | **Array\<string\>** | Available units types for variable, if *unit* is not provided, the first one of the list is selected as a default unit |
| *readOnly* | input | **boolean** | Whether the input is available for edit | 
  
### Matrix/Array Input

Allows to input numeric data into grid organised inputs, produces matrix formatted output (row major order). 
Size can be adjusted dynamically and units can be changed as well. Recalculates units on unit change.

````
<cae-matrix-input
      [(values)]="[[number]]"
      [defaultRows]="number"
      [defaultCols]="number"
      [canAddRow]="boolean"
      [canAddCol]="boolean"
      [(unit)]="string"
      [units]="[string]"
      [readOnly]="boolean"></cae-matrix-input>
```` 

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *values* | input | **Array\<Array\<number\>\>** | Default values of a matrix in row major order |
| *valuesChange* | output | **EventEmitter\<Array\<Array\<number\>\>\>** | Allows to get updates on inner values change via `$event` variable |
| *defaultRows* | input | **number** | How many rows are displayed by default (when `values` are empty, otherwise the size of `values` is used) |
| *defaultCols* | input | **number** | How many columns are displayed by default (when `values` are empty, otherwise the size of `values` is used) |
| *canAddRow* | input | **boolean** | Can user change rows amount (add or delete) dynamically |
| *canAddCol* | input | **boolean** | Can user change columns amount (add or delete) dynamically |
| *unit* | input | **string** | Default unit for values |
| *unitChange* | output | **EventEmitter** | Allows to get updates on inner unit change via `$event` variable |
| *readOnly* | input | **boolean** | Whether the input is available for edit | 

### Expression Input

Allows to input *math.js* expression. Runs expression validation and displays error info if invalid.

````
<cae-expression-input
      [(expression)]="string"
      [readOnly]="boolean"></cae-expression-input>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *expression* | input | **string** | *Math.js* expression (mathematical equations) |
| *expressionChange* | output | **EventEmitter\<string\>** | Allows to get updates on inner expression change via `$event` variable |
| *readOnly* | input | **boolean** | Whether the input is available for edit |

### Chart

XY line chart, supports units. Can display multiple series of data. Recalculates units on unit change.

````
<cae-chart
      [type]="string"
      [x]="Array<number>"
      [y]="Array<number>|Array<Array<number>>"
      [xUnit]="string"
      [yUnit]="string"
      [xUnits]="Array<string>"
      [yUnits]="Array<string>"
      [xLabel]="string"
      [yLabel]="string"
      [y2Label]="string"
      [axes]="object"
      [dataNames]="Array<string>"
      [zoom]="boolean"></cae-chart>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *type* | input | **string** | Type of a chart, may be: *line*, *bar*, *pie*, *spline*, *step*, *area-step*, *area*, *area-spline*, *scatter*, *pie*, *donut*, *gauge* (for demos please refer to: https://c3js.org/examples.html#chart) |
| *x* | input | **Array\<number\>** | X axis data |
| *y* | input | **Array\<number\>** or **Array\<Array\<number\>\>** | Y axis data, can be a single array for one data series or array of arrays for multiple series |
| *xUnit* | input | **string** | Default unit for X axis |
| *yUnit* | input | **string** | Default unit for Y axis |
| *xUnits* | input | **Array\<string\>** | Available units for X axis |
| *yUnits* | input | **Array\<string\>** | Available units for Y axis |
| *xLabel* | input | **string** | Label for X axis |
| *yLabel* | input | **string** | Label for Y axis |
| *y2Label* | input | **string** | Label for second Y axis |
| *axes* | input | **object** | Object that allows to assign values to the y or y2 axes. |
| *dataNames* | input | **Array\<string\>** | Names of data series (`y` values). If supplied, legend is displayed |
| *zoom* | input | **boolean** | Whether chart zoom is possible. Enabled by default. |

### Knob

Input element which allows to provide value by rotating a "knob". Works like circular slider. Value can be also entered by typing into contained input box.

````
<cae-knob-input
      [name]="string"
      [(variable)]="number"
      [min]="number"
      [max]="number"
      [step]="number"
      [lineWidth]="number"
      [color]="string"
      [displayInput]="boolean"
      [readOnly]="boolean"></cae-knob-input>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *name* | input | **string** | Variable name, used in expressions |
| *variable* | input | **number** | Value to change. Default: 0 |
| *variableChange* | output | **EventEmitter** | Allows to get updates on inner variable change via `$event` variable |
| *min* | input | **number** | Min value of a knob range. Default: 0 |
| *max* | input | **number** | Max value of a knob range. Default: 100 |
| *step* | input | **number** | Defines how much value will be increased/decreased in one step (of knob position change). Default: 0.01 |
| *lineWidth* | input | **number** | Defines how thick (px) will be value indicator. Default: 15 |
| *color* | input | **string** | Color of value indicator, should be of hex format. Default: *'#1f6fef'* (blue) |
| *displayInput* | input | **boolean** | Whether value input box should be visible. Default: *true* |
| *readOnly* | input | **boolean** | Whether knob should be available to change value |

### Expression Printer

Allows to print expression in pretty format (LaTeX), using MathJax library.

````
<cae-expression-printer 
      [expression]="string" 
      [parenthesis]="string"
      [implicit]="string"></div>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *expression* | input | **string** | Math expression string |
| *parenthesis* | input | **string** | Parenthesis behaviour. Can be one of: *'keep'* (keeps all existing parenthesis), *'auto'* (keeps only necessary parenthesis), *'all'* (places parenthesis to every part of equation). Default: *'keep'*. |
| *implicit* | input | **string** | Implicit multiplication. Can be one of: *'hide'* or *'show'*. Default: *'hide'* | 

### Contour Plot

Creates a contour plot from passed array of values. 

````
<cae-contour-plot 
      [values]="Array<number>"
      [thresholds]="Array<number>"
      [n]="number"
      [m]="number"
      [xDomain]="[number, number]"
      [yDomain]="[number, number]"
      [strokeColor]="string"
      [strokeWidth]="number"
      [legend]="boolean"
      [xAxis]="boolean"
      [yAxis]="boolean"
      [filled]="boolean"
      [interactivePlot]="boolean"
      (onSelect)="EventEmitter<number>"></cae-contour-plot>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *values* | input | **Array\<number\>** | Array of values (z-values) to be plotted of size *n * m* |
| *thresholds* | input | **Array\<number\>** | Intervals to segregate plot values into steps (colors). It is defined as [x1, x2, x3, ... xN] where each value *v* will fall into category where *xA <= v < xB* |
| *n* | input | **number** | Horizontal dimension of values array (width). |   
| *m* | input | **number** | Vertical dimension of values array (height). |   
| *xDomain* | input | **[number, number]** | Pair of values defining x axis function. Defines possible values of x axis (min, max). |   
| *yDomain* | input | **[number, number]** | Pair of values defining y axis function. Defines possible values of y axis (min, max). |
| *strokeColor* | input | **string** | Color of the stroke. By default value is omitted and stroke is not rendered. |
| *strokeWidth* | input | **number** | Width of the stroke. Default: *0.25* |
| *legend* | input | **boolean** | Whether to display legend. |
| *xAxis* | input | **boolean** | Whether to display x axis. |  
| *yAxis* | input | **boolean** | Whether to display y axis. |  
| *filled* | input | **boolean** | Type of plot rendered. As a lines (*false*) or filled contours (*true*). Default: *true* |
| *interactivePlot* | input | **boolean** | If set to *true* hovered contour on plot will highlight the corresponding value on legend. Requires legend to be visible. Default: *true* | 
| *onSelect* | output | **EventEmitter\<number\>** | Emits value of contour clicked | 

### Checkbox

Simple checkbox implementation component. Name of the checkbox (called title) can be either placed as a property ([title]='Do you want to check it?')
or as a body of the component (<cae-checkbox ...>Do you want to check it?</cae-checkbox>).

````
<cae-checkbox 
      [(value)]="boolean"
      [title]="string">Do you want to check it?</cae-checkbox>
````
| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *value* | input | **boolean** | True/false value of a checkbox. |
| *valueChange* | output | **EventEmitter\<boolean\>** | Callback for value update. |
| *title* | input | **string** | Title of this checkbox (name). |

### Paragraph

Groups input components. When input component is contained in Paragraph, it obtains Paragraph's name as a prefix.  
Paragraphs can be nested, in that case names of the paragraphs are concatenated with '.' as a joining character.

````
<cae-paragraph
      [name]="string"
      [title]="string"
      [isCollapsed]="boolean"
      [order]="number"
      [variables]="Array<CaeVariable>">
      <!--Here other components and paragraphs can be placed-->
      </cae-paragraph>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *name* | input | **string** | Name of the paragraph, that will be obtained as sa prefix by child components. If not supplied default value is set as *paragraphX*, where *X* is a universal component id. |
| *title* | input | **string** | Title to be displayed as a paragraph header |
| *order* | input | **number** | Force paragraph tree order insertion |
| *isCollapsed* | input | **boolean** | Whether the paragraph is collapsed by default |  
| *variables* | input | **Array\<CaeVariable\>** | If paragraph is contained in the `ComplexComponent`, assign variables that this paragraph holds. If paragraph contains only complex components (or dynamic component with complex components) this parameter should be omitted. |    


### Paragraph Group

Creates a group of paragraphs for a given component. Can arrange created sub paragraphs horizontally or vertically.
Defines a *localScope* object that holds all the variables for nested paragraphs as an array. 
Gives also a feedback when *localScope* has changed.

````
<cae-paragraph-group [size]="number"
                     [component]="ComplexComponentAbstract"
                     [params]="Array<[string, any]>"
                     (localScopeChange)="EventEmitter<LocalScopeEvent>"
                     [subTitle]="string"
                     [name]="string" 
                     [vertical]="boolean"></cae-paragraph-group>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *size* | input | **number** | Number of components to display. |
| *component* | input | **ComplexComponentAbstract** | A component to be displayed. |
| *params* | input | **Array\<[string, any]\>** | Input array of params for the displayed component. |
| *localScopeChange* | output | **EventEmitter\<LocalScopeEvent\>** | Callback for local scope changes. Each displayed component scope is hold as an object. |
| *subTitle* | input | **string** | Title of a paragraph to be displayed. In example if title 'x' is passed, the title of the component will be 'x 1', 'x 2' and so on, appending the index of the displayed paragraph. |
| *name* | input | **string** | Name of the paragraph group |
| *vertical* | input | **boolean** | Whether to display paragraphs as a column or a row. |

### SVG

Creates component containing svg element. Allows to toggle visibility of a svg's child elements and produces click events.
In order to produce click event, svg element must have set `cae:click="true"` attribute (don't forget to add namespace to root element i.e. like: `xmlns:cae="http://cae.tech"`).

````
<cae-svg [path]="string"
         [events]="Observable<[string, boolean]>"
         (elementClicked)="EventEmitter<string>"></cae-svg>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *path* | input | **string** | Path to **\*.svg** file. |
| *events* | input | **Observable\<[string, boolean]\>** | Allows to toggle visibility of the element by passing pair of values: id of an element and visibility state (true - visible). |
| *elementClicked* | output | **EventEmitter\<string\>** | Pushes id of an element being clicked. |  

### Data table

Components that allows to display values (row-major order) in a table.  
It also allows to place a button into the table. In order to do that one should place an object that extends ButtonCell interface (`{name: string; action: ((...args: any[]) => void);}`) into `data` array.
Whole data row will be injected into the function.

````
<cae-data-table [xLabels]="Array<string>" 
                [yLabels]="Array<string>" 
                [data]="Array<Array<number | string | ButtonCell>>"></cae-data-table>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *xLabels* | input | **Array\<string or number\>** | Array of labels for horizontal header. |
| *yLabels* | input | **Array\<string or number\>** | Array of labels for vertical header. |
| *data* | input | **Array\<Array\<number or string or ButtonCell\>\>** | 2D array of values to be displayed. |


### Heatmap table

Allows to display table of values (row-major order) with each cell having background color that depends on the contained value.
Colors are interpolated depending on the provided values.

````
<cae-heatmap [values]="Array<Array<number>>"
             [xLabels]="Array<string | number>" 
             [yLabels]="Array<string | number>"
             [xTitle]="string" 
             [yTitle]="string" 
             [xUnit]="string" 
             [yUnit]="string" 
             [startColor]="string"
             [middleColor]="string"
             [endColor]="string" 
             [opacity]="number" 
             [showValues]="boolean"></cae-heatmap>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *values* | input | **Array\<Array\<number\>\>** | 2D array of values to be displayed. |
| *xLabels* | input | **Array\<string or number\>** | Array of labels for horizontal header. |
| *yLabels* | input | **Array\<string or number\>** | Array of labels for vertical header. |
| *xTitle* | input | **string** | Name of the horizontal values. |
| *yTitle* | input | **string** | Name of the vertical values. |
| *xUnit* | input | **string** | Unit for x-labels. |
| *yUnit* | input | **string** | Unit for y-labels. |
| *startColor* | input | **string** | Hexadecimal color value for smallest values. Default: "#82ffbe" |
| *middleColor* | input | **string** | Hexadecimal color value for middle values. Default: "#fff482" |
| *endColor* | input | **string** | Hexadecimal color value for biggest values. Default: "#ff8282" |
| *opacity* | input | **number** | The amount of opacity for background cell color. |
| *showValues* | input | **boolean** | Whether to display values or just colored cells. |

### Table of Contents

Component for displaying paragraphs hierarchy. Gets updates from [scroll spy](#scroll-spy). Each paragraph automatically registers as a content via Table of Contents service.   

````
<cae-table-of-contents></cae-table-of-contents>
````

### Switch

Creates a on/off switch.

````
<cae-switch
            [(value)]="boolean"
            [onLabel]="string"
            [offLabel]="string"></cae-switch>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *value* | input | **EventEmitter\<boolean\>** | Switch value |
| *valueChange* | output | **EventEmitter\<boolean\>** | Callback for switch value change |
| *onLabel* | input | **string** | Label for **true** value. Default: 'ON' |
| *offLabel* | input | **string** | Label for **false** value. Default: 'OFF' |

### Point Condition

Creates component for displaying point conditions. TODO: Should probably implement some special behaviour.

````
<cae-point-condition
                     [passed]="boolean"
                     [index]="string"
                     [title]="string"
                     [acceleration]="number"
                     [speed]="number"
                     [gradient]="number"
                     [headwind]="number"
                     [mass]="number"
                     [massType]="string"></cae-point-condition>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *passed* | input | **boolean** | Does this condition passed. |
| *index* | input | **string** | Condition index (i.e. S1, A1 etc.). |
| *title* | input | **string** | Title/Name of this condition. |
| *acceleration* | input | **number** | Condition acceleration value. |
| *speed* | input | **number** | Condition speed value. |
| *gradient* | input | **number** | Condition gradient value. |
| *headwind* | input | **number** | Condition headwind value. |
| *mass* | input | **number** | Condition mass value. |
| *massType* | input | **string** | Condition type of mass. |

### Acceleration Condition

Creates component for displaying acceleration conditions. TODO: Should probably implement some special behaviour.

````
<cae-acceleration-condition
                     [passed]="boolean"
                     [index]="string"
                     [title]="string"
                     [from]="number"
                     [to]="number"
                     [time]="number"
                     [distance]="number"
                     [mass]="number"
                     [massType]="string"></cae-point-condition>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *passed* | input | **boolean** | Does this condition passed. |
| *index* | input | **string** | Condition index (i.e. S1, A1 etc.). |
| *title* | input | **string** | Title/Name of this condition. |
| *from* | input | **number** | Condition from value. |
| *to* | input | **number** | Condition to value. |
| *time* | input | **number** | Condition time value. |
| *distance* | input | **number** | Condition distance value. |
| *mass* | input | **number** | Condition mass value. |
| *massType* | input | **string** | Condition type of mass. |

### Dropdown

Creates a simple dropdown where values are passed as a param.

````
<cae-dropdown
              [(value)]="string | number"
              [values]="Array<string | number>"></cae-dropdown>
````

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *value* | input | **string or number** | Selected value. |
| *valueChange* | input | **EventEmitter\<string or number\>** | Value updates on select. |
| *values* | input | **Array\<string or number\>** | Values to select. |

## Other components

This chapter holds important abstract components and any other components that do not fit in above category (are not so specific).

* [Complex Component](#complex-component-abstract)
* [Math Component](#math-component-abstract)
* [Dynamic Component](#dynamic-component)
* [Alert](#alert)

### Complex Component (*ABSTRACT*)

This is an abstract component that should be extended by any component that will be inserted into paragraph group.
Also any child component extending this one, should override a list of variables (*variables: Array\<[string, number]\>*) that it modifies.
This array also should be updated with new values.

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *variableChange* | output | **EventEmitter\<[string, number]\>** | Callback for complex component change of variable |

> In order for child component extending this class to be exported and imported must include `providers: [{provide: ComplexComponentAbstract, useExisting: forwardRef(() => MyComplexComponent)}]` in **`@Component`** header. 

### Math Component (*ABSTRACT*)

This abstract component should be extended by those components which are supposed to hold a value or expression (to be inserted into graph).  

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *name* | input | **string** | Name of the value/expression. |

### Condition Component (*ABSTRACT*)

Abstract parent component for conditions (point condition, acceleration condition).

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *passed* | input | **boolean** | Whether condition is marked as passed. |
| *index* | input | **string** | Short name for the condition (i.e. S1, A1 etc.) |
| *title* | input | **string** | Title/Name of the condition. |

### Dynamic Component

This component allows to attach a component at a runtime. 

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *component* | input | **any** (@Component) | Component to be attached (class, i.e. [component]="ParagraphComponent"). |
| *params* | input | **Array\<[string, any]\>** | Array of params (properties) corresponding to this component. |

> If one of a params is called "onBind" and it holds a function, it is used as a callback to pass an instance of a component that has been attached. 
  
> If one of a params is called "onDestroy" and it holds a function, it is used as a callback when a component is detached. Also provides an instance of the component.
  
> When *EventEmitter* is passed as a output property, the instance of an component is also injected into function call

### Alert

Component that displays alerts on top of the page. It has no properties, alerts are displayed using [AlertService](#alert-service).

## Services

Some useful services that are implemented across the application.

* [Alert Service](#alert-service)
* [Export Service](#export-service)
* [Paragraph Tree Service](#paragraph-tree-service)
* [Solver Service](#solver-service)

### Alert Service

Service used to display alerts through the [Alert Component](#alert).  
Alerts can have properties (interface *Alert*):

| Property | Values | Description |
| -------- | ------ | ----------- |
| *type* | **SUCCESS**, **FAILURE**, **INFO**, **WARNING** | Type of the alert. |
| *time* | **SHORT**, **LONG** | Time span that alert will be visible; **SHORT** = 2000ms, **LONG** = 4000ms
| *message* | - | String message to be placed inside the alert. |

### Export Service

Allows to export and import paragraphs (and its children) into/from json file.  

### Paragraph Tree Service

This service builds up a logic tree of the paragraphs. Paragraphs register themselves into this service.

### Solver Service

Resolves equations and creates a dependency graph of the variables and expressions.

## Other classes

Here one can find classes that are used in some of the components and are mostly abstract.

* [Unit Input](#unit-input)
* [Paragraph Parent](#paragraph-parent)
* [Expression Validator](#expression-validator)
* [Range function](#range-function)
* [Scroll Spy](#scroll-spy)

### Unit Input

Abstract class that **extends Math Component**. Adds some input and output properties.

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *units* | input | **Array\<string\>** | List of all possible units. |
| *unit* | input | **string** | Default unit value. |
| *unitChange* | output | **EventEmitter\<string\>** | Emits unit that has been chosen. |

### Paragraph parent

Abstract class that is required in paragraph binding process. Adds one input property.

| Component Property | Direction | Type | Description |
| ------------------ | --------- | ---- | ----------- |
| *name* | input | **string** | Name of the paragraph. |

### Expression Validator

Directive for validating expression (equation) input. Runs `MathJS.compile(expression)` check and catches any issue it throws.

### Range function

Function contained in `shared/utils.ts` that takes two arguments: `from` and `to`, and creates an array of size `to - from` filled with number values `from + i` (`i` is an element index in array).

### Scroll Spy

Directive that takes current scroll position of a page and checks which element is visible. If visibility checks finds id of an object it pushes it trough `ScrollSpyService`.

## This and that

### Modals

In this app modals from `ng-bootstrap` are used. To create modal please refer to the page: https://getbootstrap.com/docs/4.2/components/modal/  
Please follow already chosen standard and create separate component for modals.  
  
Long story short:

* Parent component: 

```
  constructor(..., private modalService: NgbModal) { }
  
  someFunction() {
     const modal = this.modalService.open(MyModalComponent);// To open modal
     modal.componentInstance.name = name;// To set name for the modal
     modal.result.then(result => { ... });// To get modal result
  }
```

* Modal component

```
  @Input('name') name: string;
  
  constructor(public activeModal: NgbActiveModal) {}
  
  closeModal() {
    activeModal.close(result);
  }
```

> Remember to add component into the `entryComponents` in `app.module.ts`
