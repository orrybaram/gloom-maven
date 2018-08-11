import React from 'react';

export default function withDialogue(WrappedComponent) {
  return class extends React.Component {
    confirm = msg => confirm(msg); // eslint-disable-line

    alert = msg => alert(msg);

    prompt = msg => prompt(msg);

    render() {
      return (
        <WrappedComponent
          confirm={this.confirm}
          alert={this.alert}
          prompt={this.prompt}
          {...this.props}
        />
      );
    }
  };
}
