import React from 'react';
import { ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';
import { ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

export type MessageItemProps = ListItemProps & {
  message: {
    text: string;
    isRead: boolean;
    date: string;
    profile: {
      photo: string;
      fullName: string;
    };
  };
};

export const MessageItem = (props: MessageItemProps): React.ReactElement => {
  const { message, onPress, ...listItemProps } = props;

  const renderMessageDate = (): React.ReactElement => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {message.date}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      rounded
      source={{
        uri: message.profile.photo,
      }}
    />
  );

  return (
    <ListItem
      {...listItemProps}
      onPress={onPress}
      title={message.profile.fullName}
      description={message.text}
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderMessageDate}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'right',
    minWidth: 64,
  },
});
