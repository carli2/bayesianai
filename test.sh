#!/bin/bash

curl http://localhost:9040/rest/create/foo && echo ""
curl --data 'input={"absender": "Deutsche Post", "betreff", "Rechnung"}&output=TypeInvoice' http://localhost:9040/rest/train/foo && echo ""
curl --data 'input={"absender": "Lufthansa AG", "betreff", "Rechnung"}&output=TypeInvoice' http://localhost:9040/rest/train/foo && echo ""
curl --data 'input={"absender": "Deutsche Post", "betreff", "Lieferschein"}&output=TypeDeliveryNote' http://localhost:9040/rest/train/foo && echo ""
curl --data 'input={"absender": "Launix AG", "betreff", "Rechnung"}' http://localhost:9040/rest/classify/foo && echo ""
curl --data 'input={"absender": "Deutsche Post", "betreff", "Mahnung zu Rechnung Rechnung"}' http://localhost:9040/rest/classify/foo && echo ""
curl --data 'input={"absender": "Launix AG", "betreff", "Lieferschein"}' http://localhost:9040/rest/classify/foo && echo ""
