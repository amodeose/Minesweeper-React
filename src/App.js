import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let clicked = event.target;
    if (clicked.classList.contains('unclicked')) {
      clicked.classList.remove("unclicked"); 
      clicked.classList.add("clicked");
      clicked.append(clicked.value);

      let hits = 1;

      while (hits >= 1) {
      
        hits = 0;

      for (let i = 1; i < 1601; i++) {

        let current = document.getElementById(i);

        if (current.value == "" && !current.classList.contains("bomb")) {

          let neighbors = [
            i - 40,
            i + 1,
            i - 1,
            i + 40];

          if (i <= 40) {
            neighbors = neighbors.filter(function(value) {
              if (value !== i - 40) {
                return true;
              } else {
                return false;
              }
            })
          }

          if (i >= 1561) {
            neighbors = neighbors.filter(function(value) {
              if (value !== i + 40) {
                return true;
              } else {
                return false;
              }
            })
          }

          if (i === 1) {
            neighbors = neighbors.filter(function(value) {
              if (value !== i - 1) {
                return true;
              } else {
                return false;
              }
            })
          }

          if ((i - 1) % 40 === 0) {
            neighbors = neighbors.filter(function(value) {
              if (value !== i - 1) {
                return true;
              } else {
                return false;
              }
            })
          }

          if (i % 40 === 0) {
            neighbors = neighbors.filter(function(value) {
              if (value !== i + 1) {
                return true;
              } else {
                return false;
              }
            })
          }

          neighbors.forEach(function(cell) {
            if (document.getElementById(cell).classList.contains('clicked') && !current.classList.contains('clicked')) {
              current.classList.add("clicked");
              hits++;
              console.log('hit');
            } 
          })


        }

      }

    }

    }
  }

  handleRestart = () => {
    window.location.reload();
  }

  componentDidMount() {

    for (let i = 1; i < 1601; i++) {
      let count = 0;
      let current = document.getElementById(i);
      let neighbors = [
        i - 40,
        i - (39),
        i - (41),
        i + 1,
        i - 1,
        i + 40,
        i + 39,
        i + 41];

      if (i <= 40) {
        neighbors = neighbors.filter(function(value) {
          if (value !== i - 40 && value !== i - 39 && value !== i - 41) {
            return true;
          } else {
            return false;
          }
        })
      }

      if (i >= 1561) {
        neighbors = neighbors.filter(function(value) {
          if (value !== i + 40 && value !== i + 39 && value !== i + 41) {
            return true;
          } else {
            return false;
          }
        })
      }

      if (i === 1) {
        neighbors = neighbors.filter(function(value) {
          if (value !== i - 1) {
            return true;
          } else {
            return false;
          }
        })
      }

      if ((i - 1) % 40 === 0) {
        neighbors = neighbors.filter(function(value) {
          if (value !== i - 1 && value !== i - 41 && value !== i + 39) {
            return true;
          } else {
            return false;
          }
        })
      }

      if (i % 40 === 0) {
        neighbors = neighbors.filter(function(value) {
          if (value !== i + 1 && value !== i - 39 && value !== i + 41) {
            return true;
          } else {
            return false;
          }
        })
      }

      neighbors.forEach(function(element) {
        if (document.getElementById(element).classList.contains("bomb")) {
          count++;
        };
            
      })
      
      current.value = count;

      switch(count) {
        case 0:
          current.value = "";
          break;
        case 1:
          current.classList.add('blue');
          break;
        case 2:
          current.classList.add('green');
          break;
        case 3:
          current.classList.add('red');
          break;
        default:
          break;
      }
    }

  }

  render() {

    const startGame = () => {

      let arr = [];
      for (let i = 1; i < 1601; i++) {
        let roll = Math.random();
        if (roll > 0.9) {
        arr.push(<div className={"unclicked bomb cell"} key={i} onClick={this.handleClick} id={i}></div>);
        } else {
          arr.push(<div className={"unclicked cell"} key={i} onClick={this.handleClick} id={i}></div>);
        } 
      }
      return arr;
    }

    return (
      <div className="App">
        <div className="boundary">
          {startGame()}
        </div>
      </div>
    );
  }
}

export default App;

