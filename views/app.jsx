import React from "react";

export default class App extends React.Component {
    render() {
        return (
        <div className="content">
            <h1>This is a test</h1>
            <ul>{this.props.items.map(x => <li>{x.item}</li>)}</ul>
        </div>
        );
    }
}