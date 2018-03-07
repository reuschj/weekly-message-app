import React from 'react'
// import PropTypes from 'prop-types'
// Import components
import Container from '../../generic/Container'
import Row from '../../generic/Row'
import ColumnNarrow from '../../generic/ColumnNarrow'
import ColumnWide from '../../generic/ColumnWide'

const HomeScreen = (props) => {
    if (!props.show) {
        return null
    }
    return (
        <Container>
            <div id="HomeScreen">
                <Row>
                    <ColumnNarrow>
                        <p>Swimlanes will go here.</p>
                    </ColumnNarrow>
                    <ColumnWide>
                        <p>Home content will go here.</p>
                    </ColumnWide>
                </Row>
            </div>
        </Container>
    )
}

export default HomeScreen
