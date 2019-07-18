import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ParagraphComponent } from "../../basic-components/paragraph/paragraph.component";

export interface Node {
  name: string;
  parent: Node;
  children: Array<Node>;
  instance: ParagraphComponent;
}

export class ParagraphTree {// it's more of a forest because of multiple roots
  roots: Array<Node>;

  constructor() {
    this.roots = [];
  }

  put(paragraph: ParagraphComponent) {
    const names = paragraph.name.split('.');
    let foundRoot = this.roots.find(root => root.name === names[0]);

    if (!foundRoot) {
      foundRoot = { name: names[0], parent: null, children: [], instance: null };
      paragraph.order? this.roots.splice(paragraph.order, 0, foundRoot) : this.roots.push(foundRoot);
    }

    let fullName = names[0];
    let currentNode = foundRoot;
    let foundNode = null;
    for (let i = 1; i < names.length; ++i) {
      fullName += '.' + names[i];
      foundNode = this.findNode(currentNode, fullName);

      if (!foundNode) {
        const newNode = { name: fullName, parent: currentNode, children: [], instance: null };
        if (paragraph.order) {
          currentNode.children.splice(paragraph.order, 0, newNode);
        } else {
          currentNode.children.push(newNode);
        }
        currentNode = newNode;
      } else {
        currentNode = foundNode;
      }
    }

    currentNode.instance = paragraph;
  }

  remove(paragraph: ParagraphComponent): boolean {
    const foundNode = this.find(paragraph);

    if (!foundNode)
      return false;

    if (foundNode.parent) {
      const idx = foundNode.parent.children.indexOf(foundNode);
      foundNode.parent.children.splice(idx, 1);
    } else {
      const idx = this.roots.indexOf(foundNode);
      this.roots.splice(idx, 1);
    }

    return true;
  }

  find(paragraph: ParagraphComponent): Node {
    const names = paragraph.name.split('.');

    let foundRoot = this.roots.find(root => root.name === names[0]);
    if (!foundRoot)
      return null;

    let fullName = names[0];
    let currentNode = foundRoot;
    let foundNode = null;
    for (let i = 1; i < names.length; ++i) {
      fullName += '.' + names[i];
      foundNode = this.findNode(currentNode, fullName);

      if (foundNode)
        currentNode = foundNode;
    }

    if (foundNode === null && names.length == 1) {
      return foundRoot;
    }

    return foundNode;
  }

  private findNode(node: Node, name: string): Node {
    if (!node)
      return null;

    if (node.name === name)
      return node;

    if (!node.children)
      return null;

    let foundNode = null;
    for (let i = 0; i < node.children.length; ++i) {
      foundNode = this.findNode(node.children[i], name);

      if (foundNode)
        break;
    }

    return foundNode;
  }

}

@Injectable({
  providedIn: 'root'
})
export class ParagraphTreeService {

  private paragraphTree: ParagraphTree = new ParagraphTree();
  private paragraphTreeChange: BehaviorSubject<ParagraphTree> = new BehaviorSubject(this.paragraphTree);

  constructor() {}

  registerParagraph(paragraph: ParagraphComponent) {
    this.paragraphTree.put(paragraph);
    this.paragraphTreeChange.next(this.paragraphTree);
  }

  unregisterParagraph(paragraph: ParagraphComponent) {
    if (this.paragraphTree.remove(paragraph))
      this.paragraphTreeChange.next(this.paragraphTree);
  }

  getParagraphTree(): ParagraphTree {
    return this.paragraphTree;
  }

  updates(): Observable<ParagraphTree> {
    return this.paragraphTreeChange.asObservable();
  }

}
