import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const finalSpaceCharacters = [
    { id: '1', tagValue: 'Car', source: require('./assets/img4.jpg') },
    { id: '2', tagValue: 'House', source: require('./assets/img5.jpg') },
    { id: '3', tagValue: 'Nature', source: require('./assets/img13.jpg') },
    { id: '4', tagValue: 'Car', source: require('./assets/img2.jpg') },
    { id: '5', tagValue: 'House', source: require('./assets/img6.jpg') },
    { id: '6', tagValue: 'Nature', source: require('./assets/img10.jpg') },
    { id: '7', tagValue: 'Car', source: require('./assets/img3.jpg') },
    { id: '8', tagValue: 'House', source: require('./assets/img7.jpg') },
    { id: '9', tagValue: 'Nature', source: require('./assets/img11.jpg') },
    { id: '10', tagValue: 'Car', source: require('./assets/img1.jpg') },
    { id: '11', tagValue: 'House', source: require('./assets/img8.jpg') },
    { id: '12', tagValue: 'House', source: require('./assets/img9.jpg') }
];

export default function Gallery() {
    const [characters, updateCharacters] = useState(finalSpaceCharacters)

    function search() {
        var searchTerm = document.querySelector('input').value.toLowerCase()
        const tags = document.querySelectorAll('.tag')
        console.log(tags)
        Array.from(tags).forEach((tag) => {
            var parent = tag.parentElement
            var title = tag.textContent;
            console.log(parent)
            if (title.toLowerCase().indexOf(searchTerm) !== -1) {
                parent.style.display = 'block';
            } else {
                parent.style.display = 'none';
            }

        })
    }

    function handleChange() {
        search()
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateCharacters(items)
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className='halfpage'>
                <div className='inpwrap'>
                    <div className='inpwrapper'>
                        <input className='input' placeholder='Type car, or house, or nature' onKeyUp={handleChange} />
                    </div>
                </div>

                <Droppable droppableId='characters' direction="horizontal">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className='wrapper'>
                            {characters.map(({ id, tagValue, source }, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (

                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='box'>
                                                <div className='spino'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 3a9 9 0 1 0 9 9" />
                                                    </svg>
                                                </div>
                                                <img src={source} alt='gallery item' />
                                                <div className='tag'>{tagValue}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}