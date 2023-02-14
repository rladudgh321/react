import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  return <header>
    <h1><a href="/" onClick={event=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis =[];
  for(let i = 0; i<props.ts.length; i++){
    let t =props.ts[i];
    lis.push(<li key={t.id}>
      <a href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(t.id));
      }}>{t.title}</a></li>);
  }

  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}

function Article(props){
  return <article>
  <h2>{props.title}</h2>
  <p>{props.body}</p>
</article>
}


function App() {
  const [mode, setMode] = useState('Hello');
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:'html', description:'html is ...'},
    {id:2, title:'css', description:'css is ...'},
    {id:3, title:'java', description:'java is ...'},
  ];
  let content = null;
  if(mode === 'Hello'){
    content = <Article title="Welcome" body="Hello, Web"></Article>
  }else if(mode === 'read'){
    let t, d = null;
    for(let i = 0; i<topics.length; i++){
      if(topics[i].id === id){
        t = topics[i].title;
        d = topics[i].description;
      }
    }
    content = <Article title={t} body={d}></Article>
    
  }
  return (
    <div>
      <Header title="Web" onChangeMode={()=>{
        setMode('Hello');
      }}></Header>
      <Nav ts ={topics} onChangeMode={_id=>{
        setMode('read');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
