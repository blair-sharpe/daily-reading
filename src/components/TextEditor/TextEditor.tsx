import { useEffect } from 'react';
import { IconCheck, IconDeviceFloppy, IconPlus } from '@tabler/icons-react';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button, Modal, rem } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { RichTextEditor } from '@mantine/tiptap';
import { useSelectedDate } from '@/context/SelectedDateContext';
import { getNote, saveNote } from '../../../idb/indexedDB';

import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';

const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

function TextEditor() {
  const { selectedDate } = useSelectedDate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const editor = useEditor({
    extensions: [StarterKit, Underline, Highlight],
  });

  const [opened, { open, close }] = useDisclosure(false);

  const handleSave = async () => {
    if (editor) {
      const content = editor.getHTML();
      await saveNote(content, selectedDate.dayOfYear());
      close();
      notifications.show({
        position: 'bottom-right',
        message: 'Note saved',
        icon: checkIcon,
        color: 'blue',
      });
    }
  };

  const loadNote = async (dayOfYear: number) => {
    const note = await getNote(dayOfYear);
    if (note && editor) {
      editor.commands.setContent(note.content);
    }
  };

  useEffect(() => {
    if (editor) {
      loadNote(selectedDate.dayOfYear());
    }
  }, [editor, selectedDate]);

  return (
    <>
      <Modal
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        fullScreen={isMobile}
        size="60%"
        opened={opened}
        onClose={close}
        title={selectedDate.format('MMMM D')}
      >
        <RichTextEditor editor={editor} variant="subtle">
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content style={{ minHeight: '300px' }} />
        </RichTextEditor>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            leftSection={<IconDeviceFloppy />}
            size="xs"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Modal>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <Button
          onClick={open}
          justify="center"
          fullWidth
          leftSection={<IconPlus size={16} />}
          variant="transparent"
          mt="sm"
        >
          Add note
        </Button>
      </div>
    </>
  );
}

export default TextEditor;
