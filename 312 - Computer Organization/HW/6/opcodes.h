struct instruction {
        int     type,           /* type of instruction */
                addr1,          /* first address */
                addr2,          /* second address */
                data;           /* data for the instruction */
};

#define OP_NOP		0
#define OP_STORE_CONST	1
#define OP_MOVE		2
#define OP_MOVEID	3
#define OP_MOVEDI	4
#define OP_ADD_CONST	5
#define OP_ADD		6
#define OP_MUL		7
#define OP_DIV		8
#define OP_MOD		9
#define OP_OUTPUT	10
#define OP_COMPARE	11
#define OP_JUMP		12
#define OP_COND_JUMP	13
#define OP_STOREPC	14
#define OP_LOADPC	15
#define OP_HALT		16