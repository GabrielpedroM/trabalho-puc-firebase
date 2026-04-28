import { useEffect, useState } from "react";
// Ajustado: Saindo da pasta pages para a raiz da src
import { auth, db } from "../Firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Principal() {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Usamos o onAuthStateChanged para garantir que o Firebase 
    // teve tempo de verificar se o usuário está logado
    const unsubscribe = onAuthStateChanged(auth, async (usuarioLogado) => {
      if (usuarioLogado) {
        try {
          const docRef = doc(db, "usuarios", usuarioLogado.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setDados(docSnap.data());
          } else {
            console.log("Documento não encontrado no Firestore");
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      } else {
        // Se não houver usuário logado, redireciona para o login
        navigate("/");
      }
      setLoading(false);
    });

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Carregando dados...</p>;

  return (
    <div className="container">
      <h1>Página Principal</h1>
      
      {dados ? (
        <div className="perfil" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
          <h3>Bem-vindo, {dados.nome}!</h3>
          <p><strong>Nome completo:</strong> {dados.nome} {dados.sobrenome}</p>
          <p><strong>Data de Nascimento:</strong> {dados.dataNascimento}</p>
          <p><strong>E-mail:</strong> {dados.email}</p>
        </div>
      ) : (
        <p>Dados não encontrados.</p>
      )}

      <button 
        onClick={handleLogout} 
        style={{ marginTop: '20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Sair da Conta
      </button>
    </div>
  );
}