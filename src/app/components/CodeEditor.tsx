import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import * as monacoEditor from 'monaco-editor';

export default function CodeEditor() {
	const options: monaco.editor.IStandaloneEditorConstructionOptions = {
		readOnly: false,
		minimap: { enabled: false },
		scrollbar: { verticalScrollbarSize: 0 },
		renderLineHighlight: 'line',
	};
	return (
		<Editor
			theme="vs-dark"
			height="450px"
			defaultLanguage="ruby"
			defaultValue="Welcome to Arc👋"
			className=" overflow-hidden"
			options={options}
		/>
	);
}
