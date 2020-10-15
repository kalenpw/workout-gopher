import React from 'react';

import SearchIcon from "./Icons/Search";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isTyping: false,
            typingTimeout: 0,
        }
    }

    handleChange = (event) => {
        if(this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({
            value: event.target.value,
            typing: false,
            typingTimeout: setTimeout(() => {
                this.props.handleChange(this.state.value);
            }, 1000)
        });
    }

    render() {
        return (
            <div className="columns is-centered">
                <div className="column is-narrow">
                    <div className="control has-icons-left">
                        <input
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="input"
                            type="text"
                            placeholder="Search">
                        </input>
                        <span className="icon is-small is-left">
                            <SearchIcon />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
