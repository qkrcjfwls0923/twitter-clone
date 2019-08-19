import { RECV_VALUE } from 'actions/index.js';

const initialState = {
    id: -1,
    author: {
        username: "admin",
    },
    content: "for the test",
    created_date: "2019-08-10T06:19:44.304Z",
    reference: {
        author: {
            username: null
        },
        content: null
    }
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECV_VALUE:
            return action.value.map(function(value) {
                return {
                    id: value.id,
                    author: {
                        username: value.author__username
                    },
                    content: value.content,
                    created_date: value.created_date,
                    reference: {
                        author: {
                            username: value.reference__author__username,
                        },
                        content: value.reference__content
                    }
                };
            });

            default:
                return [state];
    }
}

export default postReducer;