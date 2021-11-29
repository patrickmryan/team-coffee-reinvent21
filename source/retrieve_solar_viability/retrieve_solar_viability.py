import os, re
import json
from urllib.parse import urlencode
import ssl, urllib3
import boto3


def lambda_handler(event, context):

    # API endpoint for lambda (read solrad_annual)
# https://developer.nrel.gov/api/pvwatts/v6.json?api_key=7fP1f3Wg3ZdLeNiQue3LbTJ6Ust5c5C0secZ1jim&lat=40&lon=-105&system_capacity=1&azimuth=180&tilt=0&array_type=1&module_type=1&losses=10

    api_key = os.environ.get('API_KEY')

    params = {
        'api_key': api_key,
        'lat' : event['latitude'],
        'lon' : event['longitude'],
        'system_capacity': 2000,
        'azimuth': 90,
        'tilt': 0,
        'array_type': 1,
        'module_type': 1,
        'losses': 10
    }

    host = 'https://developer.nrel.gov/api/pvwatts/v6.json'
    url = host + '?' + urlencode(params)

    http = urllib3.PoolManager(cert_reqs=ssl.CERT_NONE)
    urllib3.disable_warnings()

    response = http.request( "GET", url )
    json_resp = json.loads(response.data.decode())  # "utf-8"

    return json_resp
