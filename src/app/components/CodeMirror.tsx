import { useEffect, useRef, useState } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState, Transaction } from '@codemirror/state';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

export default function CodeEditor() {
	const editorRef = useRef<HTMLDivElement>(null);
	const [code, setCode] = useState('');

	useEffect(() => {
		if (!editorRef.current) return;

		const state = EditorState.create({
			doc: 'Welcome to Arc👋',
			extensions: [
				basicSetup,
				javascript(),
				oneDark,
				EditorView.updateListener.of((v: ViewUpdate) => {
					if (v.docChanged) {
						let docAsString = v.state.doc.toString();
						if (docAsString.endsWith('\n')) {
							docAsString += '\\n';
						}
						setCode(docAsString);
					}
				}),
			],
		});

		const view = new EditorView({
			state,
			parent: editorRef.current,
		});

		return () => {
			view.destroy();
		};
	}, []);

	return <div ref={editorRef} className="editor" />;
}
