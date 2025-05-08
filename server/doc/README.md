### API DOCUMENTATION

## Use case:: Member register

```
POST /members
REQUEST

{
    name: string
}

RESPONSE 

{
    id: int
}
```

## Use case: Pick up a book

```
POST /loans
REQUEST 
{
    member_id: int,
    book_id: int,
}
RESPONSE
{
    deadline: datetime
}
```
## Use case: Return a book

```
PATCH /loans
REQUEST
{

    book_id: int,
}

RESPONSE 
{
    status: 'ontime' | 'delayed' #TBD
}


```


## Use case: List member loans

```
GET /loan?memberId=member_id
REQUEST
{

}
RESPONSE {
    loans: {
        returnDate:datetime,
        loanDate:datetime,
        deadline:datetime,
        bookTitle:string,
    }
}
```