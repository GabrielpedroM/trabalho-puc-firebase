import { useState } from "react";
// Ajustado: Saindo da pasta pages para a raiz da src onde está o Firebase.js
import { auth, db } from "../Firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // 2. Salva os dados adicionais no Firestore usando o UID do Auth como ID do documento
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
        email: email,
        uid: user.uid 
      });

      alert("Usuário cadastrado com sucesso!");
      navigate("/"); // Redireciona para o Login
    } catch (error) {
      console.error("Erro ao cadastrar:", error.code);
      
      // Tradução de erros comuns para o seu trabalho
      if (error.code === 'auth/email-already-in-use') {
        alert("Este e-mail já está cadastrado.");
      } else if (error.code === 'auth/weak-password') {
        alert("A senha é muito fraca (mínimo 6 caracteres).");
      } else {
        alert("Erro ao cadastrar: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleCadastro}>
        <input 
          type="text" placeholder="Nome" required
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="text" placeholder="Sobrenome" required
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)} 
        />
        <input 
          type="date" required
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)} 
        />
        <input 
          type="email" placeholder="E-mail" required
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Senha" required
          value={senha}
          onChange={(e) => setSenha(e.target.value)} 
        />
        
        <button type="submit" disabled={loading}>
          {loading ? "Processando..." : "Cadastrar Usuário"}
        </button>
      </form>
    </div>
  );
}