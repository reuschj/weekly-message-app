import React from 'react';
// import PropTypes from 'prop-types'
// Import components
import Bar from '../../generic/Bar';
import SaveButton from '../buttons/SaveButton';
import SubmitButton from '../buttons/SubmitButton';
import UnSubmitButton from '../buttons/UnSubmitButton';
import PublishButton from '../buttons/PublishButton';
import UnpublishButton from '../buttons/UnpublishButton';

const MessageEditBar = (props) => {
    if (!props.show) {
        return null;
    }
    return (
        <Bar id="MessageEditBar">
            <SaveButton
                show={props.allowSave}
            />
            <SubmitButton
                show={props.allowSubmit}
            />
            <UnSubmitButton
                show={props.allowUnSubmit}
            />
            <PublishButton
                show={props.allowPublish}
            />
            <UnpublishButton
                show={props.allowUnPublish}
            />
        </Bar>
    );
};

export default MessageEditBar;
