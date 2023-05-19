import {
  Input,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { MessageItem } from '../components/message-item';

const initialMessages = [
  {
    text: 'hello world',
    isRead: true,
    date: '2022-09-09',
    profile: {
      photo:
        'https://styles.redditmedia.com/t5_55ojqz/styles/profileIcon_snoob0348221-b989-44d1-8735-041aa530ee8f-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=d2e9b7515a6958d30aff2d8d59f8bb704beab5f8',
      fullName: 'Dasith Vidanage',
    },
  },
  {
    text: 'hello world',
    isRead: true,
    date: '2022-09-09',
    profile: {
      photo:
        'https://styles.redditmedia.com/t5_55ojqz/styles/profileIcon_snoob0348221-b989-44d1-8735-041aa530ee8f-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=d2e9b7515a6958d30aff2d8d59f8bb704beab5f8',
      fullName: 'Dasith Vidanage',
    },
  },
  {
    text: 'hello world',
    isRead: true,
    date: '2022-09-09',
    profile: {
      photo:
        'https://styles.redditmedia.com/t5_55ojqz/styles/profileIcon_snoob0348221-b989-44d1-8735-041aa530ee8f-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=d2e9b7515a6958d30aff2d8d59f8bb704beab5f8',
      fullName: 'Dasith Vidanage',
    },
  },
  {
    text: 'hello world',
    isRead: true,
    date: '2022-09-09',
    profile: {
      photo:
        'https://styles.redditmedia.com/t5_55ojqz/styles/profileIcon_snoob0348221-b989-44d1-8735-041aa530ee8f-headshot.png?width=256&height=256&crop=256:256,smart&v=enabled&s=d2e9b7515a6958d30aff2d8d59f8bb704beab5f8',
      fullName: 'Dasith Vidanage',
    },
  },
];

const ConverstionList = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const [searchQuery, setSearchQuery] = useState<string>();

  const renderHeader = (): React.ReactElement => (
    <Layout style={styles.header} level="1">
      <Input placeholder="Search" value={searchQuery} />
    </Layout>
  );

  const renderItem = (info: ListRenderItemInfo<any>): React.ReactElement => (
    <MessageItem
      style={styles.item}
      message={info.item}
      onPress={() => navigation.navigate('Chat')}
    />
  );

  return (
    <List
      style={styles.list}
      data={initialMessages}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
  );
};

export default ConverstionList;

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
});
