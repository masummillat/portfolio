import React from 'react';
import { Icon } from 'antd';
import {Editor, EditorState, RichUtils, Modifier, CompositeDecorator, convertToRaw} from 'draft-js';
import StyleButton from './SytleButton';
import ColorControls from './ColorControls';
import BlockStyleButton from './BlockStyleButton';
import './editor.css';

class MyEditor extends React.Component {
    constructor(props) {
        super(props);


        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ]);


        this.state = {
            editorState: EditorState.createEmpty(decorator),
            showURLInput: false,
            urlValue: '',
            showColorPallet:false,
        };


        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);

        // this.promptForLink = this._promptForLink.bind(this);
        this.onURLChange = (e) => this.setState({urlValue: e.target.value});
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
        this.removeLink = this._removeLink.bind(this);
        this.focus = () => this.refs.editor.focus();
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.onTab = (e) => this._onTab(e);
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        }

    }


    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _promptForLink(e) {
        e.preventDefault();
        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            let url = '';
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }
            this.setState({
                showURLInput: true,
                urlValue: url,
            }, () => {
                setTimeout(() => this.refs.url.focus(), 0);
            });
        }
    }

    _confirmLink(e) {
        e.preventDefault();
        const {editorState, urlValue} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'LINK',
          'MUTABLE',
          {url: urlValue}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
              newEditorState,
              newEditorState.getSelection(),
              entityKey
            ),
            showURLInput: false,
            urlValue: '',
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }
    _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }
    _removeLink(e) {
        e.preventDefault();

        const {editorState} = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            console.log('777777777777')
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
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

    closePrompt = () => {
        this.setState({
            showURLInput: false
        })
    }



    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }



    handleHyperLink = (e)=>{
        if (getEntity(this.state.editorState,'LINK')){
            console.log('sldfjsaldfkj')
            this.removeLink(e)
        }
        else{
            console.log('===============')
            this._promptForLink(e)
        }

    }

    handleColorPallete = () => {
        this.setState({
            showColorPallet: ! this.state.showColorPallet
        });
    }

    _toggleBlockType(blockType) {
        this.onChange(
          RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
          )
        );
    }

    render() {
        const {editorState, showURLInput, showColorPallet} = this.state;
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }


        // var selectionState = editorState.getSelection()
        // var anchorKey = selectionState.getAnchorKey();
        // var currentContent = editorState.getCurrentContent();
        // var currentContentBlock = currentContent.getBlockForKey(anchorKey);
        // var start = selectionState.getStartOffset();
        // var end = selectionState.getEndOffset();
        // // var selectedText = currentContentBlock.getText().slice(start, end);
        //
        // const currentBlockKey = editorState.getSelection().getStartKey()
        // const currentBlockIndex = editorState.getCurrentContent().getBlockMap()
        //   .keySeq().findIndex(k => k === currentBlockKey)
        // console.log(currentBlockIndex+1, end)

        let urlInput;
        if (showURLInput) {
            urlInput =
              <div style={styles.urlInputContainer}>
                  <input
                    onChange={this.onURLChange}
                    ref="url"
                    style={styles.urlInput}
                    type="text"
                    value={this.state.urlValue}
                    onKeyDown={this.onLinkInputKeyDown}
                  />
                  <Icon type="close" onClick={this.closePrompt} />

              </div>;
        }


        let StyleController = (<div className="">
            {urlInput}
            <div className="style-controller-wrapper">
                <BlockStyleControls
                  editorState={editorState}
                  onToggle={this.toggleBlockType}
                />
                <Icon type="bold" onMouseDown={this._onBoldClick.bind(this)}/>
                <Icon type="italic" onMouseDown={this._onItalicClick.bind(this)}/>
                <Icon type="underline" onMouseDown={this._onUnderlineClick.bind(this)}/>
                <Icon type="code" onMouseDown={this._onCodeClick.bind(this)}/>
                <Icon type="link" style={{color: !getEntity(this.state.editorState,'LINK') ? 'white' : 'red'}} onMouseDown={this.handleHyperLink}/>
                <Icon type="bg-colors" onMouseDown={this.handleColorPallete} />
            </div>

        </div>);


        return (
            <div className="RichEditor-root" style={styles}>
                {
                    showColorPallet ? <ColorControls
                      editorState={editorState}
                      onToggle={this.toggleColor}
                    /> : null
                }
                {StyleController}
                <div style={styles.editor} onClick={this.focus}>


                    <Editor
                        customStyleMap={colorStyleMap}
                        editorState={editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        ref="editor"
                        placeholder="Tell a story..."
                        spellCheck={true}
                        onTab={this.onTab}
                        blockStyleFn={getBlockStyle}
                    />
                    <input
                      onClick={this.logState}
                      style={styles.button}
                      type="button"
                      value="Log State"
                    />
                </div>
            </div>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    // {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    // {label: 'H5', style: 'header-five'},
    // {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];


function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}
const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
          {BLOCK_TYPES.map((type) =>
            <BlockStyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          )}
      </div>
    );
};


function getEntity(editorState, entityType = null) {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
        const contentState = editorState.getCurrentContent();
        const startKey = editorState.getSelection().getStartKey();
        const startOffset = editorState.getSelection().getStartOffset();
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
        let url = '';
        if (linkKey) {
            const linkInstance = contentState.getEntity(linkKey);
            url = linkInstance.getData().url;
            return linkInstance.type === entityType
        }
    }
    return false;
}

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
          const entityKey = character.getEntity();
          return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK'
          );
      },
      callback
    );
}
const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={styles.link}>
          {props.children}
      </a>
    );
};

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
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};

export default MyEditor;