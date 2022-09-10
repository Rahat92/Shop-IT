class ApiFeatures{
  constructor(query,queryStr){
    this.query = query;
    this.queryStr = queryStr
  }
  search(){
    const keyword = this.queryStr.keyword?{
      name:{
        $regex: this.queryStr.keyword,
        $options:'i'
      }
    }:{}
    this.query = this.query.find({...keyword});
    return this;
  }
  filter(){
    const queryCopy = { ...this.queryStr };
    const removedField = ['keyword', 'page', 'limit'];
    removedField.forEach(el=> delete queryCopy[el]);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    const queryObj = JSON.parse(queryStr);
    this.query = this.query.find(queryObj);
    return this;
  }
}
module.exports = ApiFeatures