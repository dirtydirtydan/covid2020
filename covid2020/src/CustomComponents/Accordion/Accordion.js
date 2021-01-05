import React from "react";
import "./Accordion.css";

export default class Accordion extends React.Component {
    // props = { title: "", isHidden: true };
    state = { shouldShowChildren: !this.props.isHidden };

    toggleText = () => {
        // ! will reverse a boolean (Ex: true becomes false)
        this.setState({ shouldShowChildren: !this.state.shouldShowChildren });
    };

    render = () => {
        var titleClass = "accordion-title";

        if (this.state.shouldShowChildren) {
            titleClass += " expanded";
        }

        return (
            <>
                <h1 className={titleClass} onClick={this.toggleText}>
                    {this.props.title}
                    <i className="fas fa-chevron-circle-down fa-md" />
                </h1>
                {this.state.shouldShowChildren ? this.props.children : null}
            </>
        );
    };
}
