import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///belly_button_biodiversity.sqlite", echo=False)
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
OTU = Base.classes.otu
Samples = Base.classes.samples
SamplesMetadata = Base.classes.samples_metadata
session = Session(engine)


@app.route("/")
def index():
    sample_list_v = names()
    print(sample_list_v)

    return render_template("index.html")


@app.route("/names", methods=['POST','GET'])
def names():

    samples_cols_list = Base.classes.samples.__table__.columns.keys()
    sample_list = samples_cols_list[1:]
    return jsonify(samples_cols_list[1:])


@app.route("/metadata/<sample>", methods=['POST','GET'])
def metadata(sample):

    results = session.query(SamplesMetadata).filter(SamplesMetadata.SAMPLEID == sample[3:]).all()
    dict1 = {}
    for k,v in results[0].__dict__.items():
        if ('AGE' in k or 'BBTYPE' in k or 'ETHNICITY' in k or 'GENDER' in k or 'LOCATION' in k or 'SAMPLEID' in k):
            dict1[k] = v

    return jsonify(dict1)


@app.route("/samples/<sample>")
def samples(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

    # Sort by sample
    sample_data.sort_values(by=sample, ascending=False, inplace=True)

    # Format the data to send as json
    data = {
        "otu_ids": sample_data.otu_id.values.tolist(),
        "sample_values": sample_data[sample].values.tolist(),
        "otu_labels": sample_data.otu_label.tolist(),
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run()
