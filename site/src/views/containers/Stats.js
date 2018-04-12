import { connect } from 'react-redux';

import { canvasSelectors } from 'state/editor/canvas';
import { shapesSelectors } from 'state/editor/shapes';

import Stats from 'views/components/Stats/Stats';

const mapStateToProps = (state) => ({
    shapes: shapesSelectors.getShapesNum(state),
    zoom: canvasSelectors.getZoom(state),
    nodes: shapesSelectors.getNodesNum(state)
});

const StatsData = connect(
    mapStateToProps
)(Stats);

export default StatsData;