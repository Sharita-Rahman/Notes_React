import React, {useState, useEffect} from 'react'
import {View , Text, Button, StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config'
import {FlashList} from '@shopify/flash-list'
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from "./providers/AuthProviders";


const Home = (props) => {

    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();

    //fetch the data from firestore

    useEffect(() => {
        firebase.firestore()
        .collection('notes')
        .onSnapshot((querySnapshot) =>{
            const newNotes = [];
            querySnapshot.forEach((doc) => {
                const {note, title} = doc.data();
                newNotes.push({note, title, id: doc.id});
            });
            setNotes(newNotes);
        }); 
    }, []);
    return(
     <AuthContext.Consumer>
      {(auth) => (
            <View style={styles.container}>
                
                <FlashList
                    data={notes}
                    numColumns={2}
                    estimatedItemSize={100}
                    renderItem={({item}) => (
                        <View style={styles.noteView}>
                            <Pressable
                                onPress={() => navigation.navigate('Detail', {item})}
                            >
                                <Text style={styles.noteTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.noteDescription}>
                                    {item.note}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                />
            <Button
            type="outline"
            title="log out"
            color='#333D79FF'
            onPress={() => {
              auth.setIsLoggedIn(false);
            }}
            />    
            {/* <Button title='Add Notes' onPress={ () => navigation.navigate('NoteAdd')} /> */}
            <TouchableOpacity
                style= {styles.button}
                onPress={() => navigation.navigate('NoteAdd')}
            >
                <Entypo name='plus' size={45} color='white' />
            </TouchableOpacity>
            </View>
            )}
     </AuthContext.Consumer>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    },
    noteView: {
        flex:1,
        backgroundColor: '#B3C7D6FF',
        margin:10,
        padding:10,
        borderRadius:10,
        shadowColor: 'grey',
        shadowOffset: { width:0, height:2},
        shadowOpacity:0.8,
        shadowRadius: 2,
        elevation: 7,
        alignItems: 'center'
    },
    noteTitle: {
        fontSize:20,
        fontWeight: 'bold'
    },
    noteDescription: {
        fontSize:16,
        marginTop:5
    },
    button:{
        position:'absolute',
        bottom: 60,
        right: 30,
        backgroundColor: '#195190FF',
        borderRadius: 50,
        padding: 10,
        elevation: 7
    }
})