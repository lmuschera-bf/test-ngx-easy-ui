import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, signal, Signal } from '@angular/core';
import { EasyTreeDataSource, EasyTreeFileSistemNodeComponent, EasyTreeFileSystemNode, EasyTreeModule, EasyTreeNode, PANEL_CONTEXT, PANEL_MANAGER, PanelContext, PanelManager, providePanelContext, providePanelManager } from '@ngx-easy-ui/components';
import { Subject, takeUntil } from 'rxjs';

type FruitNode = {
  name: string;
}

const fruitTreeNode: EasyTreeNode<FruitNode>[] = [{
  data: { name: 'Fruit' },
  children: [
    {
      data: { name: 'Citrus' },
      children: [
        {
          data: { name: 'Orange' },
          children: []
        },
        {
          data: { name: 'Lemon' },
          children: []
        }
      ]
    },
    {
      data: { name: 'Berries' },
      children: [
        {
          data: { name: 'Strawberry' },
          children: []
        },
        {
          data: { name: 'Blueberry' },
          children: []
        }
      ]
    }
  ]
}];

const easyTreeNodeTest2: EasyTreeNode<EasyTreeFileSystemNode> = {
  data: {
    type: 'file',
    name: 'child1.1',
  },
  children: []
}

const easyTreeNodeTest1: EasyTreeNode<EasyTreeFileSystemNode> = {
  data: {
    type: 'folder',
    name: 'child1',
  },
  children: [
    easyTreeNodeTest2,
    {
      data: {
        type: 'file',
        name: 'child1.2'
      },
      children: []
    }
  ]
}

const easyTreeNode: EasyTreeNode<EasyTreeFileSystemNode>[] = [
  {
    data: {
      type: 'folder',
      name: 'root',
    },
    children: [easyTreeNodeTest1,
      {
        data: {
          type: 'folder',
          name: 'child2',
        },
        children: [
          {
            data: {
              type: 'file',
              name: 'child2.1'
            },
            children: []
          },
          {
            data: {
              type: 'folder',
              name: 'child2.2'
            },
            children: [
              {
                data: {
                  type: 'file',
                  name: 'child2.2.1'
                },
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'pannello-test-albero',
  standalone: true,
  imports: [JsonPipe],
  template: '<div class="contenuto">{{panelContext.data | json}}',
  styles: ['.contenuto { padding: 16px; }'],
  providers: [providePanelContext()]
})
class Pannello {
  protected readonly panelContext: PanelContext<Pannello, EasyTreeFileSystemNode> = inject(PANEL_CONTEXT);
  chiudi() { this.panelContext.panelRef.close() }
}

@Component({
  selector: 'test-albero',
  standalone: true,
  providers: [providePanelManager()],
  imports: [EasyTreeModule, EasyTreeFileSistemNodeComponent],
  templateUrl: './test-albero.component.html',
  styleUrl: './test-albero.component.scss'
})
export default class TestAlberoComponent implements OnDestroy {

  private readonly panelManager: PanelManager = inject(PANEL_MANAGER);

  protected readonly fruitDataSource: Signal<EasyTreeDataSource<FruitNode>> = signal(new EasyTreeDataSource(fruitTreeNode));
  protected readonly dataSource: Signal<EasyTreeDataSource<EasyTreeFileSystemNode>> = signal(new EasyTreeDataSource(easyTreeNode));
  private readonly subject: Subject<void> = new Subject();

  protected showNode(node: EasyTreeFileSystemNode) {
    this.panelManager.show(Pannello, { data: node })
      .afterClosed().pipe(takeUntil(this.subject))
      .subscribe(result => console.log('panel result', result));
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }

}
