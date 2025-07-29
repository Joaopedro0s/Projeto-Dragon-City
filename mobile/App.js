import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      tipo: '',
      habitat: '',
      nivel: '',
      raridade: '',
      imagem_url: ''
    };
  }

  cadastrarDragao = () => {
    const { nome, tipo, habitat, nivel, raridade, imagem_url } = this.state;

    if (!nome) {
      Alert.alert('Alerta do Dragão!', 'Todo dragão precisa de um nome majestoso!');
      return;
    }

    fetch('http://localhost:3000/dragao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nome, 
        tipo, 
        habitat, 
        nivel: parseInt(nivel) || 1, 
        raridade, 
        imagem_url 
      }),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Sucesso!', `Dragão ${nome} foi adicionado ao seu santuário!`);
        this.setState({
          nome: '',
          tipo: '',
          habitat: '',
          nivel: '',
          raridade: '',
          imagem_url: ''
        });
      })
      .catch(error => {
        Alert.alert('Fogo no ninho!', 'O dragão escapou antes de ser cadastrado!');
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image 
            source={{ uri: 'https://example.com/dragon-icon.png' }} 
            style={styles.dragonIcon}
          />
          <Text style={styles.title}>Santuário do Dragão</Text>
          <Text style={styles.subtitle}>Registre seu novo dragão</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome do Dragão</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Dragão de Terra"
              placeholderTextColor="#aaa"
              value={this.state.nome}
              onChangeText={text => this.setState({ nome: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo Elemental</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Fogo, Terra, Gelo"
              placeholderTextColor="#aaa"
              value={this.state.tipo}
              onChangeText={text => this.setState({ tipo: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Habitat Natural</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Terrestre, Elétrico"
              placeholderTextColor="#aaa"
              value={this.state.habitat}
              onChangeText={text => this.setState({ habitat: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nível de Poder</Text>
            <TextInput
              style={styles.input}
              placeholder="1-70"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={this.state.nivel}
              onChangeText={text => this.setState({ nivel: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Raridade</Text>
            <TextInput
              style={styles.input}
              placeholder="Comum, Raro, Épico, Lendário"
              placeholderTextColor="#aaa"
              value={this.state.raridade}
              onChangeText={text => this.setState({ raridade: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Imagem do Dragão</Text>
            <TextInput
              style={styles.input}
              placeholder="URL da imagem"
              placeholderTextColor="#aaa"
              value={this.state.imagem_url}
              onChangeText={text => this.setState({ imagem_url: text })}
            />
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={this.cadastrarDragao}
          >
            <Text style={styles.buttonText}>INCUBAR DRAGÃO</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 25,
    alignItems: 'center',
  },
  dragonIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffcc00',
    textShadowColor: '#ff6600',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginTop: -70,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    color: '#ffcc00',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#ff6600',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#2d2d4a',
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff3300',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#ffcc00',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default App;