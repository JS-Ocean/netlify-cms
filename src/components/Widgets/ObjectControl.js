import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';
import { resolveWidget } from '../Widgets';
import styles from '../ControlPanel/ControlPane.css';

export default class ObjectControl extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onAddMedia: PropTypes.func.isRequired,
    getMedia: PropTypes.func.isRequired,
    value: PropTypes.node,
    field: PropTypes.node,
  };

  controlFor(field) {
    const { onAddMedia, onRemoveMedia, getMedia, value, onChange } = this.props;
    const widget = resolveWidget(field.get('widget') || 'string');
    const fieldValue = value && value.get(field.get('name'));

    return (
      <div className={styles.control} key={field.get('name')}>
        <label className={styles.label}>{field.get('label')}</label>
        {
          React.createElement(widget.control, {
            field,
            value: fieldValue,
            onChange: (val) => {
              onChange((value || Map()).set(field.get('name'), val));
            },
            onAddMedia,
            onRemoveMedia,
            getMedia,
          })
        }
      </div>
    );
  }

  render() {
    const { field } = this.props;
    const fields = field.get('fields');

    if (!fields) {
      return <h3>No fields defined for this widget</h3>;
    }

    return (<div>
      {field.get('fields').map(field => this.controlFor(field))}
    </div>);
  }
}