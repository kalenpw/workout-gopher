import React from 'react';

import SearchIcon from "./Icons/Search";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value }, () => {
            this.props.handleChange(this.state.value);
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
