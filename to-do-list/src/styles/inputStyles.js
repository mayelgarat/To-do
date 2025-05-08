export const inputStyles = {
                '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 6px 0 #0000001F',

                    '& fieldset': {
                        borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                        borderColor: '#8b5cf6',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#8b5cf6',
                        borderWidth: '2px',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#888',
                    fontWeight: 500,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#8b5cf6',
                },

                // שינוי לפי קלאס dark על האב
                '.dark &': {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#342F65',
                        color: '#fff',
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#aaa',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#a78bfa',
                    },
                },
            }