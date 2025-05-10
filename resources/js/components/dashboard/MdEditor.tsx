import { cn } from '@/lib/utils';
import type { ImageT, InfoT } from '@/types';
import { usePage } from '@inertiajs/react';
import MonacoEditor from '@monaco-editor/react';
import { AlignCenter, Bold, Braces, Heading, Image, Images, List, Signature } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function MdEditor({ value = '', onChange = null }) {
    const { info, images } = usePage().props as unknown as { info: InfoT; images: ImageT[] };
    const [openImages, setOpenImages] = useState(false);

    const editorRef = useRef(null);
    const [input, setInput] = useState(`![Logo of Nicos](${info.logo})
<center>

# Welcome to ${info.name}
</center>

Write here your content in **Markdown** or **HTML**.
`);

    useEffect(() => {
        if (value) {
            setInput(value);
        }
    }, [value]);

    const insertAtCursor =
        (before: string, after: string = '') =>
        () => {
            if (!editorRef.current) return;
            const editor = editorRef.current;
            const selection = editor.getSelection();
            const model = editor.getModel();
            if (!selection || !model) return;
            const selectedText = model.getValueInRange(selection);
            const newText = before + selectedText + after;
            editor.executeEdits('', [
                {
                    range: selection,
                    text: newText,
                    forceMoveMarkers: true,
                },
            ]);
            editor.focus();
            const newPosition = selection.getStartPosition();
            const offset = before.length + selectedText.length + after.length;
            const endPosition = model.modifyPosition(newPosition, offset);
            editor.setPosition(endPosition);
        };
    return (
        <>
            <div className="mx-auto flex max-h-[calc(100dvh-180px)] w-full gap-5">
                <div className="h-full flex-1 overflow-hidden rounded-lg border bg-[#292d3e]">
                    <Tools insertAtCursor={insertAtCursor} openImages={() => setOpenImages(true)} />
                    <Editor
                        editorRef={editorRef}
                        value={input}
                        onChange={(value) => {
                            setInput(value);
                            onChange?.(value);
                        }}
                    />
                </div>
                <div className="prose dark:prose-invert prose-img:w-full max-w-none flex-1 overflow-auto rounded-lg border px-4 py-5">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{input}</ReactMarkdown>
                </div>
            </div>
            <div className={cn('fixed inset-0 z-10 flex items-center justify-center px-5', { hidden: !openImages })}>
                <div className="bg-background/5 fixed inset-0 cursor-pointer backdrop-blur-sm" onClick={() => setOpenImages(false)} />
                <div className="bg-background relative z-[1] mx-auto h-full max-h-[500px] w-full max-w-[800px] overflow-auto rounded-lg border p-5">
                    <h3 className="mb-2 text-lg font-bold">Images</h3>
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-8">
                        {images.map((image) => (
                            <button
                                key={image.id}
                                onClick={insertAtCursor(
                                    `<img alt="${image.name}" style="border-radius:5px" src="/storage/img/images/${image.name}" />`,
                                )}
                                className="cursor-pointer transition-transform duration-200 hover:scale-110"
                            >
                                <img
                                    className="aspect-video w-full rounded object-cover transition-transform duration-200"
                                    src={image.url}
                                    alt={'Image of service ' + image.name}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function Tools({ insertAtCursor, openImages = null }) {
    return (
        <div className="mb-2 flex gap-2 px-7 pt-5">
            <Tool icon={Heading} onClick={insertAtCursor('# ')} />
            <Tool icon={List} onClick={insertAtCursor('- ')} />
            <Tool icon={Bold} onClick={insertAtCursor('**', '**')} />
            <Tool icon={Braces} onClick={insertAtCursor('```js\n', '\n```')} />
            <Tool icon={Signature} onClick={insertAtCursor('_', '_')} />
            <Tool icon={AlignCenter} onClick={insertAtCursor('<center>\n\n', '\n</center>')} />
            <Tool icon={Image} onClick={insertAtCursor('<img alt="" style="border-radius:5px" src="', '" />')} />
            <Tool icon={Images} onClick={openImages} />
        </div>
    );
}

function Tool({ icon, onClick }) {
    const Icon = icon;
    return (
        <button
            className="cursor-pointer rounded bg-black/20 p-2 text-white transition-all duration-200 hover:scale-105 hover:bg-black/50"
            onClick={onClick}
        >
            <Icon size={15} />
        </button>
    );
}

function Editor({ editorRef, value, onChange = null }) {
    return (
        <MonacoEditor
            // max-height="500px"
            className="h-full w-full"
            onMount={(editor) => (editorRef.current = editor)}
            defaultLanguage="markdown"
            defaultValue="# Escribe aquí tu Markdown"
            theme="palenight"
            beforeMount={(monaco: any) => monaco.editor.defineTheme('palenight', palenightTheme)}
            options={{
                fontSize: 14,
                fontLigatures: true,
                minimap: { enabled: false },
                wordWrap: 'on',
            }}
            value={value}
            onChange={(value) => onChange?.(value)}
        />
    );
}

const palenightTheme = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        { token: '', foreground: 'a6accd', background: '292d3e' },
        { token: 'comment', foreground: '676e95' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'variable', foreground: 'f07178' },
        { token: 'type', foreground: '82aaff' },
        { token: 'function', foreground: '82aaff' },
    ],
    colors: {
        'editor.background': '#292d3e',
        'editor.foreground': '#a6accd',
    },
};
