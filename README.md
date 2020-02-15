Usage
=====

to run tests:
```
bash ./test.sh
```

API description: see .odt document

Example Test Run
================

```
curl http://localhost:9040/rest/create/foo && echo ""
curl --data 'input={"absender": "Deutsche Post", "betreff": "Rechnung"}&output=TypeInvoice' http://localhost:9040/rest/train/foo && echo ""
curl --data 'input={"absender": "Lufthansa AG", "betreff": "Rechnung"}&output=TypeInvoice' http://localhost:9040/rest/train/foo && echo ""
curl --data 'input={"absender": "Deutsche Post", "betreff": "Lieferschein"}&output=TypeDeliveryNote' http://localhost:9040/rest/train/foo && echo ""
curl --data 'input={"absender": "Hanse Merkur", "betreff": "Lieferschein"}&output=TypeDeliveryNote' http://localhost:9040/rest/train/foo && echo ""

curl --data 'input={"absender": "Launix AG", "betreff": "Rechnung"}' http://localhost:9040/rest/classify/foo && echo ""
curl --data 'input={"absender": "Deutsche Post", "betreff": "Mahnung zu Rechnung"}' http://localhost:9040/rest/classify/foo && echo ""
curl --data 'input={"absender": "Launix AG", "betreff": "Lieferschein"}' http://localhost:9040/rest/classify/foo && echo ""
```

results in the following output:
```
true
true
true
true
true

{"output":"TypeInvoice","confidentiality":0.8571428571428571}
{"output":"TypeInvoice","confidentiality":0.75}
{"output":"TypeDeliveryNote","confidentiality":0.6}
```
