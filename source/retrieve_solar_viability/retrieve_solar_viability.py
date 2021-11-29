import os, re
import json
from urllib.parse import urlencode
import ssl, urllib3
import boto3


def lambda_handler(event, context):

    print(json.dumps(event))

    qs_params = event['queryStringParameters']

    # API endpoint for lambda (read solrad_annual)
# https://developer.nrel.gov/api/pvwatts/v6.json?api_key=7fP1f3Wg3ZdLeNiQue3LbTJ6Ust5c5C0secZ1jim&lat=40&lon=-105&system_capacity=1&azimuth=180&tilt=0&array_type=1&module_type=1&losses=10

    api_key = os.environ.get('API_KEY')

    params = {
        'api_key': api_key,
        'lat' : qs_params['latitude'],
        'lon' : qs_params['longitude'],
        'system_capacity': 2000,
        'azimuth': 90,
        'tilt': 0,
        'array_type': 1,
        'module_type': 1,
        'losses': 10
    }
    http = urllib3.PoolManager(cert_reqs=ssl.CERT_NONE)
    urllib3.disable_warnings()

    host = 'https://developer.nrel.gov/api'

    api = 'pvwatts/v6.json'
    url = f'{host}/{api}?' + urlencode(params)

    response = http.request( "GET", url )
    solrad_annual = json.loads(response.data.decode())  # "utf-8"

    api = 'utility_rates/v3.json'
    url = f'{host}/{api}?' + urlencode(params)

    response = http.request( "GET", url )
    utility_rates = json.loads(response.data.decode())


    return {
        'dollar_per_kwh' : utility_rates['outputs']['residential'],


        'solrad_annual' : solrad_annual,
        'utility_rates': utility_rates
    }
