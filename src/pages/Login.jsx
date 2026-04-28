import { useState } from 'react';
// Caminho ajustado: saindo de pages (..) e acessando o Firebase na raiz da src
import { auth } from '../Firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false); // Para desabilitar o botão enquanto carrega
  const navigate = useNavigate();

  const handleAcessar = async (e) => {
    // Previne o comportamento padrão se estiver dentro de um form, 
    // embora aqui você esteja usando um botão solto.
    if(e) e.preventDefault();
    
    if (!email || !senha) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setMensagem('');

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/principal'); 
    } catch (error) {
      console.error("Erro no login:", error.code);
      // Tratamento de erro mais amigável
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        setMensagem('E-mail ou senha incorretos.');
      } else if (error.code === 'auth/invalid-email') {
        setMensagem('Formato de e-mail inválido.');
      } else {
        setMensagem('Erro ao tentar acessar. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required
        />
        
        <button onClick={handleAcessar} disabled={loading}>
          {loading ? 'Acessando...' : 'Acessar página Principal'}
        </button>
        
        {mensagem && <p style={{ color: 'red', fontSize: '0.9rem' }}>{mensagem}</p>}

        <p>
          Não tem conta? <Link to="/cadastro">Cadastre-se aqui</Link>
        </p>
      </div>
    </div>
  );
}