import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  return <header>
    <h1><a href="/index" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = [];
  for(let i = 0; i<props.ts.length; i++){
    let t = props.ts[i];
    lis.push(<li key={t.id}><a href={'/read/'+ t.id} onClick={event=>{
      event.preventDefault();
      props.onChangeMode(t.id);
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

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title,body);
    }}>
      <p><input tpye="text" name="title" placeholder="title"/></p>
      <p><textarea tpye="text" name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"/></p>
    </form>
  </article>
}
function Update(props){
  const [title,setTitle] = useState(props.title);
  const [body,setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title,body);
    }}>
      <p><input tpye="text" name="title" placeholder="title" value={title} onChange={event=>{
        // console.log(event.target.value);
        setTitle(event.target.value);
      }}/></p>
      <p><textarea tpye="text" name="body" placeholder="body" value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"/></p>
    </form>
  </article>  
}

function App() {
  const [mode, setMode] = useState('welcome');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'java', body:'java is ...'},
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'welcome'){
    content = <Article title ="welcome" body="hello, web"></Article>
  }else if(mode === 'read'){
    let a,b = null;
    for(let i = 0; i<topics.length; i++){
      if(topics[i].id === id){
        a = topics[i].title;
        b = topics[i].body;
      }
    }
    content =  <Article title ={a} body={b}></Article>
    contextControl = <li><a href={'/Update'+id} onClick={event=>{
      event.preventDefault();
      setMode('update');
    }}>Update</a></li>

  }else if(mode === 'create'){
    content =<Create onCreate={(_title, _body)=>{
      const newTopic = {id: nextId, title: _title, body: _body};
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('read');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }else if(mode === 'update'){
    let a,b = null;
    for(let i = 0; i<topics.length; i++){
      if(topics[i].id === id){
        a = topics[i].title;
        b = topics[i].body;
      }
    }
    content = <Update title={a} body={b} onUpdate={(_title,_body)=>{
      // console.log(title,body);
      const newTopics = [...topics];
      const updatedTopic = {id:id, title:_title, body:_body};
      for(let i = 0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('read');
    
    }}></Update>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('welcome');
      }}></Header>
      <Nav ts ={topics} onChangeMode={_id=>{
        setMode('read');
        setId(_id);
      }}></Nav>
      {content}
      
      <ul>
      <li>
        <a href="/Create" onClick={event=>{
          event.preventDefault();
          setMode('create');
        }}>Create</a>
      </li>
      {contextControl}
      </ul>
    </div>
  );
}

export default App;
