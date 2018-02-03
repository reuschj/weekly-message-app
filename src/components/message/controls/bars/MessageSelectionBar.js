import Bar from '..../generic/Bar'
import HomeButton from '../buttons/HomeButton'
import AreaSelect from '../selects/AreaSelect'
import YrWkSelect from '../selects/YrWkSelect'
import PrintButton from '../buttons/PrintButton'

const MessageSelectionBar = (props) => {
    if (!this.props.show) {
        return (
            <Bar id="MessageIsBeingEdited" addClass="editable">
                <h4>You are editing {props.area}.</h4>
            </Bar>
        )
    }
    return (
        <Bar id="MessageSelectionBar">
            <HomeButton
                area={props.area}
                setArea={props.setArea}
                active={props.homeActive}
            />
            <AreaSelect
                area={props.area}
                setArea={props.setArea}
                homeActive={props.homeActive}
                config={props.config}
            />
            <YrWkSelect
                setYrwk={props.setYrwk}
                config={props.config}
            />
            <PrintButton />
        </Bar>
    )
}

export default MessageSelectionBar
