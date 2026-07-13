import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { X } from 'lucide-react-native';
import { Typography } from '@/components/atoms/Typography';
import { COLORS } from '@/constants/colors';
import { styles } from './styles';

interface Props {
  label?: string;
  placeholder?: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ label, placeholder = 'Digite uma tag e pressione Enter', tags, onChange }: Props) {
  const [draft, setDraft] = useState('');

  const handleSubmit = () => {
    const newTag = draft.trim();
    if (!newTag || tags.includes(newTag)) {
      setDraft('');
      return;
    }

    onChange([...tags, newTag]);
    setDraft('');
  };

  const handleRemove = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Typography variant="body/medium" style={styles.label}>
          {label}
        </Typography>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.neutral[400]}
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      </View>

      {tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Typography variant="body/small" color={COLORS.primary[800]}>
                {tag}
              </Typography>
              <TouchableOpacity onPress={() => handleRemove(tag)}>
                <X size={14} color={COLORS.primary[800]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
