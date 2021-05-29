import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Layout from '../components/Layout'
import Title from '../components/Title'

const Profile: FC<{}> = (props) => {
  return (
    <Layout>
      <View style={styles.container}>
        <Title>Profile</Title>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
})

export default Profile
