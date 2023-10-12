import React from "react";

export default function Grid(props) {

  // const [show, setShow] = useState(true);

  // function componentDidMount() {
  //   fetch("http://localhost:8083/person-controller/readAll")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       this.setState.data = data.results;
  //     });
  // }


    render (
      <div
      style={{ visibility: props.status ? "visible" : "hidden" }}
      className="box">
   
      <ul >
        {this.props.status.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      </div>
    );
  
}

