var React = require('react'),
    ReactDND = require('react-dnd');

var ItemTypes = require('./ItemTypes');
var Question = require('./Question');
var SurveyActions = require('../actions/SurveyActions');

var Block = React.createClass({
    mixins: [ReactDND.DragDropMixin],
    statics: {
        configureDragDrop: function(register) {
            register(ItemTypes.QUESTION, {
                dropTarget: {
                    acceptDrop: function(component, item) {
                        component.handleQuestionDrop();

                    }
                }
            });
        }
    },
    propTypes: {
        id: React.PropTypes.number,
        questions: React.PropTypes.array,
        subblocks: React.PropTypes.array
    },
    getDefaultProps: function() {
        return {
            id: 0,
            questions: [],
            subblocks: []
        }
    },
    handleQuestionDrop() {
        SurveyActions.questionDropped(this.props.id);
    },
    render: function() {
        var questions = this.props.questions;

        var questionDropState = this.getDropState(ItemTypes.QUESTION);
        var isHovering = questionDropState.isHovering;
        var isDragging = questionDropState.isDragging;
        var borderColor, style={};

        if (isHovering) {
            borderColor = '#CAD2C5';
        } else if (isDragging) {
            borderColor = '#52796F';
        }
        style.borderColor = borderColor;

        return (
            <div className="item block"
                {...this.dropTargetFor(ItemTypes.QUESTION)}
                style={style}>
                <span className="item-id">Block {this.props.id}</span>
            {questions.map(function(q) {
                return (
                    <Question options={q.options}
                        qtext={q.qtext}
                        key={q.id}
                        id={q.id} />
                )
            })}
            </div>
        )
    }
});

module.exports = Block;
