import os, re
import json
from urllib.parse import urlencode
import ssl, urllib3
import boto3


def lambda_handler(event, context):

    print(json.dumps(event))

    # qs_params = event['queryStringParameters']

    # API endpoint for lambda (read solrad_annual)
# https://developer.nrel.gov/api/pvwatts/v6.json?api_key=7fP1f3Wg3ZdLeNiQue3LbTJ6Ust5c5C0secZ1jim&lat=40&lon=-105&system_capacity=1&azimuth=180&tilt=0&array_type=1&module_type=1&losses=10

    api_key = os.environ.get('API_KEY')

    params = {
        'api_key': api_key,
        'system_capacity': 2000,
        'azimuth': 90,
        'tilt': 0,
        'array_type': 1,
        'module_type': 1,
        'losses': 10
    }

    for key, value in (event['queryStringParameters']).items():
        params[key] = value

    http = urllib3.PoolManager(cert_reqs=ssl.CERT_NONE)
    urllib3.disable_warnings()

    host = 'https://developer.nrel.gov/api'

    api = 'pvwatts/v6.json'
    url = f'{host}/{api}?' + urlencode(params)

    print(url)
    print(json.dumps(params))

    response = http.request( "GET", url)
    details = json.loads(response.data.decode())  # "utf-8"
    print(json.dumps(details))

    solrad_annual = details['outputs']['solrad_annual']

    api = 'utility_rates/v3.json'
    url = f'{host}/{api}?' + urlencode(params)

    response = http.request( "GET", url )
    details = json.loads(response.data.decode())
    rate = details['outputs']['residential']

    # {
    #    kwhPerM2PerDay, # from solrad_annual kWh/m2/day
    #    co2eqSavedPerYearPerM2, # solrad_annual * 365 * (0.39 - 0.05)
    #    costsSavedPerYearPerM2, # From other API endpoint -> residential $/kWh residential * 24 * 365
    # }

    return {
        'kwhPerM2PerDay' : solrad_annual,
        'co2eqSavedPerYearPerM2' : solrad_annual * 365*(0.39 - 0.05),
        'costsSavedPerYearPerM2' : rate * solrad_annual * 365

    }
