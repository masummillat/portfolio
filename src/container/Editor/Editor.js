import React from 'react';
import { Icon } from 'antd';
import {Editor, EditorState, RichUtils, Modifier} from 'draft-js';
import StyleButton from './SytleButton';
import ColorControls from './ColorControls';
import addLinkPlugin from "./plugins/addLinkPlugin";

class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
        this.plugins = [addLinkPlugin];

    }
    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    _onItalicClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }
    _onUnderlineClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    _onCodeClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
    }

    _toggleColor(toggledColor) {
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(colorStyleMap)
          .reduce((contentState, color) => {
              return Modifier.removeInlineStyle(contentState, selection, color)
          }, editorState.getCurrentContent());
        let nextEditorState = EditorState.push(
          editorState,
          nextContentState,
          'change-inline-style'
        );
        const currentStyle = editorState.getCurrentInlineStyle();
        // Unset style override for current color.
        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }
        // If the color is being toggled on, apply it.
        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(
              nextEditorState,
              toggledColor
            );
        }
        this.onChange(nextEditorState);

    }

        // link

    onAddLink = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt("Paste the link -");
        if (!link) {
            this.onChange(RichUtils.toggleLink(editorState, selection, null));
            return "handled";
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
            url: link
        });
        const newEditorState = EditorState.push(
          editorState,
          contentWithEntity,
          "create-entity"
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
        return "handled";
    };


    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    StyleController = (<div className="style-controller-wrapper">
        <Icon type="bold" onClick={this._onBoldClick.bind(this)}/>
        <Icon type="italic" onClick={this._onItalicClick.bind(this)}/>
        <Icon type="underline" onClick={this._onUnderlineClick.bind(this)}/>
        <Icon type="code" onClick={this._onCodeClick.bind(this)}/>
        <Icon type="link" onClick={this.onAddLink}/>

    </div>)
    render() {
        const {editorState} = this.state;
        return (
            <div style={styles}>
                <ColorControls
                  editorState={editorState}
                  onToggle={this.toggleColor}
                />
                <div style={styles.editor} onClick={this.focus}>
                {this.StyleController}
                    <Editor
                        customStyleMap={colorStyleMap}
                        editorState={editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        plugins={this.plugins}
                    />
                </div>
            </div>
        );
    }
}


// This object provides the styling information for our custom color
// styles.
const colorStyleMap = {
    red: {
        color: 'rgba(255, 0, 0, 1.0)',
    },
    orange: {
        color: 'rgba(255, 127, 0, 1.0)',
    },
    yellow: {
        color: 'rgba(180, 180, 0, 1.0)',
    },
    green: {
        color: 'rgba(0, 180, 0, 1.0)',
    },
    blue: {
        color: 'rgba(0, 0, 255, 1.0)',
    },
    indigo: {
        color: 'rgba(75, 0, 130, 1.0)',
    },
    violet: {
        color: 'rgba(127, 0, 255, 1.0)',
    },
};


const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        fontSize: 14,
        padding: 20,
        width: 600,
    },
    editor: {
        borderTop: '1px solid #ddd',
        cursor: 'text',
        fontSize: 16,
        marginTop: 20,
        minHeight: 400,
        paddingTop: 20,
    },
    controls: {
        fontFamily: '\'Helvetica\', sans-serif',
        fontSize: 14,
        marginBottom: 10,
        userSelect: 'none',
    },
    styleButton: {
        color: '#999',
        cursor: 'pointer',
        marginRight: 16,
        padding: '2px 0',
    },
};

export default MyEditor;