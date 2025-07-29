import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';

export default class App extends Component {
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
      Alert.alert('Erro', 'O campo nome é obrigatório.');
      return;
    }

    fetch('http://SEU_IP_OU_DOMINIO:3000/dragao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, tipo, habitat, nivel: parseInt(nivel) || 0, raridade, imagem_url }),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Sucesso', data.message);
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
        Alert.alert('Erro', 'Não foi possível cadastrar o dragão.');
        console.error(error);
      });
  }

  render() {
    const { nome, tipo, habitat, nivel, raridade, imagem_url } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastrar Dragão</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={text => this.setState({ nome: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo"
          value={tipo}
          onChangeText={text => this.setState({ tipo: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Habitat"
          value={habitat}
          onChangeText={text => this.setState({ habitat: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Nível"
          keyboardType="numeric"
          value={nivel}
          onChangeText={text => this.setState({ nivel: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Raridade"
          value={raridade}
          onChangeText={text => this.setState({ raridade: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="URL da Imagem"
          value={imagem_url}
          onChangeText={text => this.setState({ imagem_url: text })}
        />

        <Button title="Cadastrar" onPress={this.cadastrarDragao} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#e8f4f8',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3b3b6d',
  },
  input: {
    height: 40,
    borderColor: '#3b3b6d',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});
