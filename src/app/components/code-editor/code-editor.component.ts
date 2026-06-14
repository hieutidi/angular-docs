import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  input,
  model,
  viewChild,
  inject,
  effect,
} from '@angular/core';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { csharp } from '@codemirror/legacy-modes/mode/clike';
import { javascript } from '@codemirror/lang-javascript';
import { StreamLanguage } from '@codemirror/language';
import { EditorState, Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from '@codemirror/view';
import { CodeLanguage } from '../../models/content.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-code-editor',
  encapsulation: ViewEncapsulation.None,
  template: `<div #host class="code-editor-host border border-slate-200 dark:border-slate-800"></div>`,
  styles: `
    .code-editor-host {
      min-height: 220px;
      overflow: hidden;
      border-radius: 0.5rem;
    }

    .code-editor-host .cm-editor {
      min-height: 220px;
      font-size: 13px;
    }

    .code-editor-host .cm-scroller {
      font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
    }

    .code-editor-host .cm-gutters {
      border-right: 1px solid #334155;
    }
  `,
})
export class CodeEditorComponent implements AfterViewInit, OnDestroy {
  readonly code = model('');
  readonly language = input<CodeLanguage>('typescript');
  readonly readOnly = input(false);

  private readonly themeService = inject(ThemeService);
  private readonly host = viewChild.required<ElementRef<HTMLDivElement>>('host');
  private view?: EditorView;

  constructor() {
    effect(() => {
      const theme = this.themeService.theme();
      if (this.view) {
        this.view.setState(EditorState.create({
          doc: this.code(),
          extensions: this.buildExtensions(this.language(), this.readOnly(), theme),
        }));
      }
    });
  }

  ngAfterViewInit(): void {
    const state = EditorState.create({
      doc: this.code(),
      extensions: this.buildExtensions(this.language(), this.readOnly(), this.themeService.theme()),
    });

    this.view = new EditorView({
      state,
      parent: this.host().nativeElement,
      dispatch: (tr) => {
        this.view!.update([tr]);
        if (tr.docChanged) {
          this.code.set(this.view!.state.doc.toString());
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.view?.destroy();
  }

  reset(value: string): void {
    if (!this.view) return;
    this.view.dispatch({
      changes: { from: 0, to: this.view.state.doc.length, insert: value },
    });
    this.code.set(value);
  }

  private buildExtensions(language: CodeLanguage, readOnly: boolean, theme: 'light' | 'dark'): Extension[] {
    const extensions: Extension[] = [
      lineNumbers(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      this.languageExtension(language),
      EditorView.editable.of(!readOnly),
    ];

    if (theme === 'dark') {
      extensions.push(oneDark);
      extensions.push(EditorView.theme({
        '&': { backgroundColor: '#020617' },
        '.cm-gutters': { background: '#0f172a', color: '#64748b' },
        '.cm-content': { caretColor: '#a78bfa' },
        '&.cm-focused .cm-cursor': { borderLeftColor: '#a78bfa' },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
          backgroundColor: '#4c1d95 !important',
        },
      }));
    } else {
      extensions.push(EditorView.theme({
        '&': { backgroundColor: '#f8fafc', color: '#0f172a' },
        '.cm-gutters': { background: '#f1f5f9', color: '#94a3b8' },
        '.cm-content': { caretColor: '#7c3aed' },
        '&.cm-focused .cm-cursor': { borderLeftColor: '#7c3aed' },
        '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
          backgroundColor: '#ddd6fe !important',
        },
      }));
    }

    return extensions;
  }

  private languageExtension(language: CodeLanguage): Extension {
    switch (language) {
      case 'csharp':
        return StreamLanguage.define(csharp);
      case 'typescript':
        return javascript({ typescript: true });
      case 'sql':
        return StreamLanguage.define(csharp);
      case 'shell':
        return javascript();
      default:
        return javascript({ typescript: true });
    }
  }
}
