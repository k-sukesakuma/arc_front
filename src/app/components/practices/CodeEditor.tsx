import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import CircularProgress from '@mui/material/CircularProgress';

export default function CodeEditor({
	onMount,
}: {
	onMount: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}) {
	const options: monaco.editor.IStandaloneEditorConstructionOptions = {
		readOnly: false,
		minimap: { enabled: false },
		scrollbar: { verticalScrollbarSize: 0 },
		renderLineHighlight: 'line',
		lineHeight: 25,
		fontSize: 20,
		fontFamily: 'Arial',
	};

	const handleEditorDidMount = (editor: any, monaco: any) => {
		monaco.editor.defineTheme('myTheme', {
			base: 'vs-dark',
			inherit: true,
			rules: [
				{ token: 'identifier', foreground: '#6099C8' },
				{ token: 'identifier.function', foreground: '#DCDCAA' },
				{ token: 'type', foreground: '#1AAFB0' },
				{ token: 'lineNumbers', foreground: '#9CDCFE' },
				{ token: 'keyword.operator', foreground: '#FF0000' },
			],
			colors: {
				'editor.foreground': '#6099C8',
				'editorLineNumber.foreground': '#999999',
				'editor.selectionBackground': '#BDD5FC',
				'editor.inactiveSelectionBackground': '#D4D4D4',
			},
		});

		// テーマの適用
		editor.updateOptions({ theme: 'myTheme' });

		onMount(editor);
	};

	return (
		<Editor
			height="440px"
			defaultLanguage="ruby"
			loading={<CircularProgress style={{ color: 'grey' }} />}
			className=" overflow-hidden"
			options={options}
			onMount={handleEditorDidMount}
		/>
	);
}
