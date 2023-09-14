import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import * as monacoEditor from 'monaco-editor';
import CircularProgress from '@mui/material/CircularProgress';

export default function CodeEditor() {
	const options: monaco.editor.IStandaloneEditorConstructionOptions = {
		readOnly: false,
		minimap: { enabled: false },
		scrollbar: { verticalScrollbarSize: 0 },
		renderLineHighlight: 'line',
		lineHeight: 25,
		fontSize: 16,
	};
	return (
		<Editor
			theme="vs-light"
			height="440px"
			defaultLanguage="ruby"
			defaultValue="Welcome to Arc👋"
			loading={<CircularProgress style={{ color: 'grey' }} />}
			className=" overflow-hidden"
			options={options}
		/>
	);
}
