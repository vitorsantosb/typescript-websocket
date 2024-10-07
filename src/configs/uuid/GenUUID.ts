import * as uuid from 'uuid';

function CreateId(){
	return uuid.v7();
}
function ValidateGeneratedId(id: string){
	return uuid.validate(id);
}

export {
	CreateId,
	ValidateGeneratedId
}

