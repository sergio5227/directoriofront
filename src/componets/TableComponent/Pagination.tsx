import React,{useState} from "react";
import Pagination from "react-bootstrap/Pagination";
import { paginationProps } from "./types";


const PaginationComponent: React.FC<paginationProps> = (props: paginationProps) => {
  
  const [active,setActive] = useState<number>(1);
  let items = [];
  items.push(<Pagination.First onClick={(s)=>{
    setActive(1)
    props?.onPage(1)
    }}/>)
  if(active>1){
    for (let number = active-2; number <= active-1; number++) {
      if(number !== 0){
        items.push(
          <Pagination.Item key={number} active={number === active} onClick={(s)=>{
            setActive(number)
            props?.onPage(number)
            }}>
            {number}
          </Pagination.Item>
        );
      }
    }
  }
  if(props?.elemenmtos <= 10){
    
      
        items.push(
          <Pagination.Item key={1} active>
            {1}
          </Pagination.Item>
        );
      
  }
  for (let number = active; number <= active+10; number++) {
    if(number <= props?.elemenmtos && number !== 0){
      items.push(
        <Pagination.Item key={number} active={number === active} onClick={(s)=>{
          setActive(number)
          props?.onPage(number)
          }}>
          {number}
        </Pagination.Item>
      );
    }
  }
  
  items.push(<Pagination.Last onClick={(s)=>{
    setActive(props?.elemenmtos)
    props?.onPage(props?.elemenmtos)
    }}/>)
    
  return (
    <div style={{ textAlign: 'center'}}>
      <Pagination style={{display: 'inline-flex', textAlign: 'left'}}>{items}</Pagination>    
    </div>
  );
};

export default PaginationComponent;
