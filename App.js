import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage, KeyboardAvoidingView } from 'react-native';



export default function App() {

  const [estado, setEstado] = useState('leitura');
  const [anotacao, setanotacao] = useState('');

  useEffect(() => {
    (async()=>{
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setanotacao(anotacaoLeitura);
      }catch(error){}
    })();
  }, [])


  const setData = async ()=>{
    try{
      await AsyncStorage.setItem('anotacao', anotacao);
    }
    catch(error){
      console.log(error)
    }
  }

  const atualizarTexto = ()=>{
    setEstado('leitura');
    setData();
  }

  if(estado == 'leitura'){
  return (
    <View style={{flex:1}}>
        <View style={styles.header}>
          <Text style={{
            textAlign: 'center', 
            color: '#fff',  
            fontWeight: 'bold',
            fontSize: 18}}
          > 
             Anotação App
          </Text>  
        </View>

        <View style={{padding:20}}>
          {
            (anotacao != '')?
            <Text style={styles.anotacao}>{anotacao}</Text>
            :
            <View style={{padding:20}}><Text style={{opacity:0.3}}>Nenhuma anotação encontrada :(</Text></View>
          }
        </View>

        {  
          (anotacao == '') ?
          <TouchableOpacity 
            style={styles.btnAnotacao}
            onPress={()=> setEstado('atualizando')}
          >
            <Text style={styles.btnAnotacaoText}>+</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity 
          style={styles.btnAnotacaoEdit}
          onPress={()=> setEstado('atualizando')}
        >
          <Text style={styles.btnAnotacaoTextSave}>Editar</Text>
        </TouchableOpacity>
        }
      <StatusBar hidden />
    </View>
  );
}
else if(estado == 'atualizando'){
  return (
    <KeyboardAvoidingView style={{flex:1}}>
        <View style={styles.header}>
          <Text style={{
            textAlign: 'center', 
            color: '#fff',  
            fontWeight: 'bold',
            fontSize: 18}}
          > 
             Anotação App
          </Text>  
        </View>

        <View style={{alignItems:'center'}}>

          <TextInput 
          style={styles.textInput}
            returnKeyLabel='go'
            autoFocus={true}
            multiline= {true}
            numberOfLines={5}
            value={anotacao}
            onChangeText={(text)=>setanotacao(text)}
          >
          </TextInput>    


          <TouchableOpacity 
            style={styles.btnAnotacaoSave}
            onPress={atualizarTexto}
          >
            <Text style={styles.btnAnotacaoTextSave}>Salvar</Text>
          </TouchableOpacity>

        </View>
      <StatusBar hidden/>

    </KeyboardAvoidingView>
  );
}
}

const styles = StyleSheet.create({
  header: {
    width:'100%',
    padding: 10,
    backgroundColor: '#069',
  },

  anotacao:{
    fontSize:13
  },

  btnAnotacao:{
    flex:1,
    position:"absolute",
    right:20,
    bottom:20,
    width:50,
    height:50,
    backgroundColor:'#069',
    borderRadius: 25
  },

  btnAnotacaoText:{
    position:"relative",
    color:'#fff',
    textAlign:'center',
    justifyContent:'center',
    fontSize: 30
  },

  btnAnotacaoEdit:{
       position:"absolute",
       right:20,
       bottom:20,
       padding:8,
       backgroundColor:'#069',
       borderRadius: 12
     },

  btnAnotacaoSave:{
    margin:8,
    padding:8,
    alignItems:"center",
    width: 100,
    backgroundColor:'#069',
    borderRadius: 12
  },

  btnAnotacaoTextSave:{
    color:'#fff',
    textAlign:'center',
    fontSize: 22
  },

  textInput:{
    width:'100%',
    marginBottom: 5,
    padding:8,
    borderWidth:1,
    textAlignVertical: 'top'
  },
})

