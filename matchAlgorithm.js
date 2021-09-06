

alpha_score_generator = function ( male, female){
    let list = male.toLowerCase().toString().split("") ;
    let female_ = female.toLowerCase().toString().split("") ;
    let match = ("matches").split("") ;
    match = match.concat(female_) ;
    //console.log(list);
    //console.log(match);
    let score_list = [] ;
    char = ( list.length > 0 )? list.shift() : match.shift() ;
    while ( char ){
        index = match.indexOf(char) ;
        if (index > -1 ){
            score_list.push(2) ;
            match.splice( index, 1) ;
        }else{
            score_list.push(1) ;
        }
        char = ( list.length > 0 )? list.shift() : match.shift() ;
    }
    return score_list ;
}

sum_score = function( scores_list ){
    let scores = scores_list ;
    let scores_ = [] ;
    while( scores.length > 2 || scores_.length > 0 ) {
        let first = scores.shift() ;
        let last = scores.pop() ;
        let total = ( first + last ).toString().split("") ;
        let list = total.map(x => parseInt(x)) ;
        //console.log(list);
        scores_ = scores_.concat(list);
        //console.log(scores_);

        if( scores.length < 2 ){ 
            //console.log(scores_);
            scores = scores_.concat(scores) ;
            scores_ = [];
        }
    }

    return scores ;
}

module.exports = function ( male, female){
    scores_array = alpha_score_generator(male, female) ;
    console.log(scores_array)
    final_score = parseInt( sum_score(scores_array).join("")) ;
    return final_score ;
}

